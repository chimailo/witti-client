import React from 'react';
import { useRouter } from 'next/router';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Loading from './Loading';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bottom: {
      color: theme.palette.common.white,
    },
    top: {
      color: theme.palette.primary.main,
      animationDuration: '500ms',
      position: 'absolute',
      left: 0,
    },
    circle: {
      strokeLinecap: 'round',
    },
  })
);

interface LoadMoreProps extends ButtonProps {
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
            endIcon={<Loading size={iconSize} />}
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
