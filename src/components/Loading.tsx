import React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';

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

export default function CircularLoading(props: CircularProgressProps) {
  const classes = useStyles();

  return (
    <Box
      py={2}
      position='relative'
      display='inherit'
      justifyContent='center'
      alignItems='center'
    >
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
    </Box>
  );
}
