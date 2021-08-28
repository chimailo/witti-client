import React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      display: 'inherit',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2, 0),
    },
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

export function CircularLoading(props: CircularProgressProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CircularProgress
        variant='determinate'
        className={classes.bottom}
        size={props.size || 16}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant='indeterminate'
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={props.size || 16}
        thickness={4}
        {...props}
      />
    </div>
  );
}

interface CenteredLoadingProps extends BoxProps {
  size?: number;
}

export const CenteredLoading = (props: CenteredLoadingProps) => (
  <Box
    display='flex'
    alignItems='center'
    justifyContent='center'
    py={4}
    {...props}
  >
    <CircularLoading size={props.size} />
  </Box>
);
