import React from 'react';
import { useRouter } from 'next/router';
import TopTags from './TopTags';
import WhoToFollow from './WhoToFollow';

export default function Widgets() {
  const router = useRouter();
  console.log(router.route);

  return (
    <>
      {!router.route.split('/').includes('explore') && <TopTags />}
      <WhoToFollow />
    </>
  );
}
