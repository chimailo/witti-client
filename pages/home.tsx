import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Header from '../src/components/Header';
import TabChild, { a11yProps, TabPanel } from '../src/components/tabs';
import Wrapper from '../src/components/Wrapper';
import { KEYS } from '../src/lib/constants';
import { useAuth } from '../src/lib/auth-context';
import * as ROUTES from '../src/lib/routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      boxShadow: theme.shadows[0],
      backgroundColor: theme.palette.background.paper,
    },
    tab: {
      textTransform: 'capitalize',
    },
  })
);

export default function Home() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const classes = useStyles();
  const { isAuthenticated, error, isLoading } = useAuth();

  const key =
    value === 1 ? [KEYS.HOME_FEED, 'top'] : [KEYS.HOME_FEED, 'latest'];

  console.log(isAuthenticated);
  console.log(isLoading);
  console.log(error);

  useEffect(() => {
    if ((!isLoading && !isAuthenticated) || error) {
      router.replace(ROUTES.LOGIN);
    }
  }, [error, isLoading, isAuthenticated, router]);

  return (
    <>
      <Head>
        <title>Home | Witti</title>
      </Head>
      <Wrapper cacheKey={key}>
        <Header avatar title='home' />
        <Box flexGrow={1} mt={0.5}>
          <AppBar position='static' className={classes.appbar}>
            <Tabs
              value={value}
              onChange={() => setValue(value)}
              aria-label='Tag Tab'
              textColor='primary'
              indicatorColor='primary'
              variant='fullWidth'
            >
              <Tab
                label='Latest'
                {...a11yProps('latest')}
                className={classes.tab}
              />
              <Tab label='Top' {...a11yProps('top')} className={classes.tab} />
            </Tabs>
          </AppBar>
          <TabPanel type='latest' value={value} index={0}>
            <TabChild cacheKey={key} url={`/posts?latest=true`} />
          </TabPanel>
          <TabPanel value={value} index={1} type='top'>
            <TabChild cacheKey={key} url={`/posts?top=true`} />
          </TabPanel>
        </Box>
      </Wrapper>
    </>
  );
}
