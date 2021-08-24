import { Typography } from '@material-ui/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Witti</title>
        <meta name='description' content='share witty comments' />
      </Head>
      <Typography>Landing</Typography>
    </>
  );
};

export default Home;
