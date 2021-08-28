import React, { Fragment, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import FollowTab from '../../src/components/tabs/Follow';
import Header from '../../src/components/Header';
import LoadMore from '../../src/components/LoadMore';
import ProfileCard from '../../src/components/cards/ProfileCard';
import useIntersectionObserver from '../../src/lib/hooks/useIntersectionObserver';
import Wrapper from '../../src/components/Wrapper';
import { CenteredLoading } from '../../src/components/Loading';
import { useInfiniteUsers, useUser } from '../../src/lib/hooks/user';

export default function FollowersTab() {
  const loadMoreRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { username } = router.query;
  const { data: user } = useUser(username as string);
  const {
    data,
    error,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteUsers(`/users/${username}/followers`);

  useIntersectionObserver({
    enabled: hasNextPage,
    target: loadMoreRef,
    onIntersect: () => fetchNextPage(),
  });

  return (
    <>
      <Head>
        <title>Followers | {user?.profile.name}</title>
      </Head>
      <Wrapper>
        <Header
          back
          title={`${user?.profile.name}`}
          user={user}
          meta={`${user?.followers} followers`}
        />
        <FollowTab username={username as string} />
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
            {data?.pages.map((page, i) => (
              <Fragment key={i}>
                {page.data.map((followers, idx) => (
                  <Fragment key={idx}>
                    <ProfileCard
                      user={followers}
                      page={i}
                      cacheKey={`/users/${username}/followers`}
                    />
                  </Fragment>
                ))}
              </Fragment>
            ))}
            <LoadMore
              // fullWidth
              resource='followers'
              iconSize={16}
              ref={loadMoreRef}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={() => fetchNextPage()}
              style={{ textTransform: 'capitalize' }}
            />
          </>
        )}
      </Wrapper>
    </>
  );
}
