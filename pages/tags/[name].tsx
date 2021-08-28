import React from 'react';
import Head from 'next/head';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import Header from '../../src/components/Header';
import TabChild, { a11yProps, TabPanel } from '../../src/components/tabs';
import Wrapper from '../../src/components/Wrapper';
import { KEYS } from '../../src/lib/constants';
import { useTag } from '../../src/lib/hooks/posts';

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

export default function Tag() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const classes = useStyles();
  const { name } = router.query;
  const {
    data: tag,
    isLoading: loading,
    isError: tagError,
  } = useTag(name as string);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const meta = loading || tagError ? '' : `${tag?.followedBy.count} following`;
  const key = value === 1 ? [KEYS.TAGS, 'top'] : [KEYS.TAGS, 'latest'];

  return (
    <>
      <Head>
        <title>Witti | Tags</title>
        <meta name='description' content='Select tags to follow' />
      </Head>
      <Wrapper cacheKey={key}>
        <Header back title={`#${name}`} meta={meta} />
        <Box flexGrow={1} mt={0.5}>
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
              <Tab label='Top' {...a11yProps('top')} className={classes.tab} />
            </Tabs>
          </AppBar>
          <TabPanel type='latest' value={value} index={0}>
            <TabChild cacheKey={key} url={`/tags/${name}?latest=true`} />
          </TabPanel>
          <TabPanel value={value} index={1} type='top'>
            <TabChild cacheKey={key} url={`/tags/${name}?top=true`} />
          </TabPanel>
        </Box>
      </Wrapper>
    </>
  );
}
