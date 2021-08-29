import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import SwipeableViews from 'react-swipeable-views';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { autoPlay } from 'react-swipeable-views-utils';
import {
  makeStyles,
  Theme,
  createStyles,
  useMediaQuery,
  useTheme,
  Box,
} from '@material-ui/core';

// import hero from '../../hero.jpg';
import Logo from '../src/components/svg/logo';
import { Body } from '../src/components/Post/Content';
import { CenteredLoading } from '../src/components/Loading';
import { getToken } from '../src/lib/utils';
import { Post } from '../types';
import { useAuth } from '../src/lib/auth-context';
import * as ROUTES from '../src/lib/routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      height: '100vh',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      '&:after': {
        top: 0,
        left: 0,
        content: '""',
        zIndex: -1,
        width: '100%',
        height: '100vh',
        display: 'block',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
    },
    imgContainer: {
      width: '100%',
      height: '100vh',
      position: 'absolute',
      zIndex: -1,
      top: 0,
      left: 0,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    margin: {
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(0, 1),
      },
    },
    main: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    sample: {
      width: '100%',
      minHeight: 120,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      padding: theme.spacing(3, 0),
    },
  })
);

const Landing: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const { isAuthenticated, isLoading: loading } = useAuth();

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery('featured-posts', async () => {
    const res: AxiosResponse<Post[]> = await axios.get(`/posts/featured`);
    return res.data;
  });

  useEffect(() => {
    if (getToken() && isAuthenticated) {
      router.replace(ROUTES.HOME);
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <Head>
        <title>Witti</title>
        <meta name='description' content='share witty comments' />
      </Head>
        <div className={classes.root}>
          <div className={classes.imgContainer}>
            <Image
              src='/hero.jpg'
              alt='Logo'
              placeholder='blur'
              className={classes.image}
            />
          </div>
          <AppBar color='transparent' elevation={0}>
            <Container maxWidth='md'>
              <Toolbar
                component='nav'
                disableGutters
                style={{ justifyContent: 'space-between' }}
              >
                <Logo />
                <div>
                  <Button
                    variant='outlined'
                    color='secondary'
                    href={ROUTES.SIGNUP}
                    className={classes.margin}
                  >
                    Sign up
                  </Button>
                  <Button
                    color='secondary'
                    href={ROUTES.LOGIN}
                    className={classes.margin}
                  >
                    Login
                  </Button>
                </div>
              </Toolbar>
            </Container>
          </AppBar>
          <Box
            height={400}
            component='main'
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
          >
            <Container maxWidth='sm' className={classes.main}>
              <Typography
                align='center'
                variant={matchesXs ? 'h4' : 'h3'}
                component='h1'
                color='secondary'
                gutterBottom
              >
                Want to see something funny?
              </Typography>
              <Typography
                component='h6'
                align='center'
                color='secondary'
                paragraph
              >
                Join in the fun and share your funny moments.
              </Typography>
              <Button
                size='large'
                variant='outlined'
                color='primary'
                onClick={() => router.push(ROUTES.SIGNUP)}
                style={{ margin: 'auto' }}
              >
                Join for free.
              </Button>
            </Container>
            <section className={classes.sample}>
              <Container maxWidth='sm'>
                {isLoading && <CenteredLoading />}
                {isError && (
                  <Typography component='p' align='center'>
                    An error occured
                  </Typography>
                )}
                {posts && <FeaturedPostsCarousel posts={posts} />}
              </Container>
            </section>
          </Box>
        </div>
    </>
  );
};

export default Landing;

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function FeaturedPostsCarousel({ posts }: { posts: Post[] }) {
  const [activePost, setActivePost] = React.useState(0);
  const theme = useTheme();
  const handleStepChange = (step: number) => {
    setActivePost(step);
  };

  return (
    <AutoPlaySwipeableViews
      enableMouseEvents
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activePost}
      onChangeIndex={handleStepChange}
      interval={7000}
    >
      {posts.map((post) => (
        <>
          <Body post={post.body} dark />
          <Typography
            variant='subtitle2'
            align='right'
            color='secondary'
            component='p'
          >
            - {post.author.username}
          </Typography>
        </>
      ))}
    </AutoPlaySwipeableViews>
  );
}
