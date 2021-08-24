import React from 'react';
import { useRouter } from 'next/router';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Box, Typography } from '@material-ui/core';
import Link from '../Link';
import EmbedPost from './Embed';
import { Post } from '../../../types';

interface PostContentProps {
  post: Post;
  postPage?: boolean;
}

export default function PostContent({ post, postPage }: PostContentProps) {
  const router = useRouter();

  return (
    <>
      {post.parent ? (
        <Body post={post.body} />
      ) : postPage ? (
        <Body post={post.body} postPage />
      ) : (
        <Link underline='none' href={`/posts/${post.id}`}>
          <Body post={post.body} />
        </Link>
      )}
      {post.parent && !router.pathname.split('/').includes('posts') && (
        <EmbedPost post={post.parent} />
      )}
      <Box flexWrap='wrap' display='flex' alignItems='center' mb={2}>
        {post?.tags.map((tag) => (
          <Link
            color='textSecondary'
            key={tag.id}
            href={`/tags/${tag.name}`}
            style={{ marginRight: 8 }}
          >{`#${tag.name}`}</Link>
        ))}
      </Box>
    </>
  );
}

export function Body({
  post,
  postPage,
  dark,
}: {
  post: string;
  postPage?: boolean;
  dark?: boolean;
}) {
  const options = {
    inlineStyles: {
      ITALIC: {
        style: { fontSize: 14 },
      },
    },
    entityStyleFn: (entity: any) => {
      const entityType = entity.get('type').toLowerCase();
      if (entityType === 'link') {
        const data = entity.getData();
        return {
          element: 'a',
          attributes: {
            href: data.url,
            rel: data.rel,
          },
          style: {
            color: '#12aac9',
            textDecoration: 'none',
          },
        };
      }
    },
  };

  return post.match('({"blocks":)') ? (
    <Typography
      color={dark ? 'secondary' : 'textPrimary'}
      component='p'
      gutterBottom
      variant={postPage ? 'h6' : 'subtitle1'}
      dangerouslySetInnerHTML={{
        __html: stateToHTML(convertFromRaw(JSON.parse(post).body), options),
      }}
    />
  ) : (
    <Typography
      color={dark ? 'secondary' : 'textPrimary'}
      component='p'
      gutterBottom
      variant={postPage ? 'h6' : 'subtitle1'}
    >
      {post}
    </Typography>
  );
}
