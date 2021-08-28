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
    box: {
      flexGrow: 1,
      marginTop: theme.spacing(0.5),
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 4,
    },
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

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

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
        <div className={classes.box}>
          <div className={classes.container}>
            <AppBar position='static' className={classes.appbar}>
              <Tabs
                value={value}
                onChange={handleChange}
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
                <Tab
                  label='Top'
                  {...a11yProps('top')}
                  className={classes.tab}
                />
              </Tabs>
            </AppBar>
          </div>
          <TabPanel type='latest' value={value} index={0}>
            <TabChild cacheKey={key} url={`/posts?latest=true`} />
          </TabPanel>
          <TabPanel value={value} index={1} type='top'>
            <TabChild cacheKey={key} url={`/posts?top=true`} />
          </TabPanel>
        </div>
      </Wrapper>
    </>
  );
}

// export const getServerSideProps = async (context) => {
//   const token = windows.localStorage.getItem('wittiUser');
//   console.log('token: ', token);
//   if (token) setAuthToken(token);

//   const { data }: AxiosResponse<User> = await axios.get('/users/auth', {});

//   if (!data) {
//     return {
//       redirect: {
//         destination: ROUTES.LOGIN,
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { data },
//   };
// };
