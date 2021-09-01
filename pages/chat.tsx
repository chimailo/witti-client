import React, { Fragment, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import { Paper, Hidden, Grid, Box, Container } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Header from '../src/components/Header';
import LoadMore from '../src/components/LoadMore';
import Messages from '../src/components/Messages';
import Sidebar from '../src/components/Sidebar';
import Wrapper from '../src/components/Wrapper';
import { CenteredLoading } from '../src/components/Loading';
import { Chat, ChatForm } from '../src/components/Chat';
import { KEYS } from '../src/lib/constants';
import { User } from '../types';
import {
  useInfiniteChatMessages,
  useInfiniteMessages,
} from '../src/lib/hooks/messages';
import useIntersectionObserver from '../src/lib/hooks/useIntersectionObserver';
import { useUser } from '../src/lib/hooks/user';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: 104,
      },
      [theme.breakpoints.up('lg')]: {
        marginLeft: 244,
      },
    },
    messages: {
      marginTop: 4,
      overflow: 'auto',
      height: 'calc(100vh - 54px - 4px)',
    },
    paper: {
      margin: '4px 0',
      height: 'calc(100vh - 54px - 56px - 4px - 4px)',
    },
    chatArea: {
      display: 'flex',
      overflow: 'auto',
      height: '100%',
      flexDirection: 'column-reverse',
      padding: theme.spacing(1),
    },
    button: {
      textTransform: 'capitalize',
    },
    chatForm: {
      position: 'static',
      right: 0,
      bottom: 0,
      width: '100%',
      padding: theme.spacing(1, 1, 0),
    },
  })
);

export default function ChatPage() {
  const classes = useStyles();
  const loadMoreRef = useRef<HTMLButtonElement>(null);
  const bottomScrollRef = useRef<Element>();
  const queryClient = useQueryClient();
  const auth = queryClient.getQueryData<User>(KEYS.AUTH);
  const router = useRouter();
  const { username } = router.query;
  const { data: user } = useUser(username! as string);
  const { data: messages, error, isError, isLoading } = useInfiniteMessages();
  const {
    data,
    error: chatError,
    isError: chatIsError,
    isLoading: chatLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteChatMessages(`${username}`);

  useIntersectionObserver({
    enabled: hasNextPage,
    target: loadMoreRef,
    onIntersect: () => fetchNextPage(),
  });

  const scrollToBottom = () => {
    bottomScrollRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  };

  useEffect(() => {
    if (bottomScrollRef) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <>
      <Head>
        <title>{auth?.profile.name} messages | Witti</title>
        <meta name='description' content='Search for tags and users.' />
      </Head>
      <Wrapper>
        <Container maxWidth='xl' disableGutters>
          <Hidden xsDown>
            <Sidebar user={auth} />
          </Hidden>
          <div className={classes.main}>
            <Grid container spacing={1}>
              <Hidden smDown>
                <Grid item xs={12} md={6}>
                  <Header title='Messages' />
                  {isLoading ? (
                    <CenteredLoading />
                  ) : isError ? (
                    <Box py={4}>
                      <Typography color='textSecondary' align='center'>
                        {error?.response?.data.message}
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Paper square elevation={0} className={classes.messages}>
                        <Messages data={messages} />
                      </Paper>
                    </>
                  )}
                </Grid>
              </Hidden>
              <Grid item xs={12} md={6}>
                {user && (
                  <Header
                    avatar
                    back
                    title={user.profile.name}
                    meta={user.profile.username}
                    user={user}
                  />
                )}
                <Paper square elevation={0} className={classes.paper}>
                  {chatLoading ? (
                    <CenteredLoading />
                  ) : chatIsError ? (
                    <Box py={4}>
                      <Typography color='textSecondary' align='center'>
                        {chatError?.response?.data.message}
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Box className={classes.chatArea}>
                        {data?.pages.map((page, i) => (
                          <Fragment key={i}>
                            {page.data.map((message, idx) => (
                              <Fragment key={idx}>
                                <Chat
                                  message={message}
                                  pageIndex={i}
                                  username={user?.profile.username}
                                />
                              </Fragment>
                            ))}
                          </Fragment>
                        ))}
                        <LoadMore
                          fullWidth
                          size='small'
                          resource='messages'
                          iconSize={16}
                          ref={loadMoreRef}
                          hasNextPage={hasNextPage}
                          isFetchingNextPage={isFetchingNextPage}
                          fetchNextPage={() => fetchNextPage()}
                          className={classes.button}
                        />
                      </Box>
                    </>
                  )}
                </Paper>
                <Paper square elevation={0} className={classes.chatForm}>
                  {user && (
                    <ChatForm
                      user={{ id: user.id, username: user.profile.username }}
                      authorId={auth?.id}
                    />
                  )}
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Wrapper>
    </>
  );
}
