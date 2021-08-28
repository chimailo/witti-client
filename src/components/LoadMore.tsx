import React from 'react';
import { useRouter } from 'next/router';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { CircularLoading } from './Loading';

interface LoadMoreProps extends ButtonProps {
  fullWidth?: boolean;
  iconSize: number;
  resource?: string;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

// eslint-disable-next-line react/display-name
export default React.forwardRef<HTMLButtonElement | null, LoadMoreProps>(
  (props, ref) => {
    const router = useRouter();
    const {
      fullWidth,
      iconSize,
      resource,
      hasNextPage,
      isFetchingNextPage,
      fetchNextPage,
    } = props;

    return (
      <>
        {isFetchingNextPage ? (
          <Button
            fullWidth={fullWidth}
            endIcon={<CircularLoading />}
            disabled={isFetchingNextPage}
            {...props}
          >
            Loading more...
          </Button>
        ) : hasNextPage ? (
          <Button ref={ref} onClick={() => fetchNextPage()} {...props}>
            Load more {resource}
          </Button>
        ) : router.pathname.includes('messages') ? (
          <Button disabled={!hasNextPage} {...props}></Button>
        ) : (
          <Button disabled={!hasNextPage} {...props}>
            No more {resource}
          </Button>
        )}
      </>
    );
  }
);
