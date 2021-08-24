import React from 'react';
import { useRouter } from 'next/router';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Button, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import firebase from '../lib/firebase';
import { APIError } from '../../types';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '100vh',
    },
  })
);

export default function ErrorReload({ error }: { error?: APIError }) {
  const user = firebase.auth().currentUser;
  const router = useRouter();
  const classes = useStyles();

  return (
    <span className={classes.wrapper}>
      <Typography
        variant='h6'
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <ErrorOutlineIcon />
        &nbsp;
        {error?.error}
      </Typography>
      <Typography>
        {error?.message || `An unexpected error ocurred, please try again.`}
      </Typography>
      <Button
        disableElevation
        color='secondary'
        variant='contained'
        startIcon={<RefreshIcon />}
        onClick={() => {
          user?.getIdToken(true);
          router.reload();
        }}
      >
        Retry
      </Button>
    </span>
  );
}
