import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Paper, Typography, Grid, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

import firebase from '../src/lib/firebase';
import Link from '../src/components/Link';
import LoginForm from '../src/components/forms/Login';
import Logo from '../src/components/svg/logo';
import { getToken } from '../src/lib/utils';
import { useAuth } from '../src/lib/auth-context';
import * as ROUTES from '../src/lib/routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      height: '100%',
      width: '100%',
      position: 'relative',
      '&:after': {
        content: '""',
        position: 'fixed',
        width: '100%',
        height: '70vh',
        zIndex: -1,
        top: 0,
        transformOrigin: 'left top',
        transform: 'skewY(-15deg)',
        backgroundColor: theme.palette.primary.main,
      },
    },
    paper: {
      width: '100%',
      padding: theme.spacing(3, 5),
      [theme.breakpoints.up('sm')]: {
        maxWidth: '500px',
        boxShadow: theme.shadows[3],
        padding: theme.spacing(5, 10),
        margin: theme.spacing(4, 'auto'),
      },
    },
  })
);

interface AuthError {
  code: string;
  message: string;
}

export default function Login() {
  const [error, setError] = useState<AuthError | null>(null);
  const [alert, setAlert] = useState(false);
  const classes = useStyles();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (getToken() && isAuthenticated) {
      router.replace(ROUTES.HOME);
    }
  }, [isAuthenticated, router]);

  return (
    <React.Fragment>
      <Head>
        <title>Login | LeanUrls</title>
      </Head>
      <div className={classes.wrapper}>
        <Grid
          container
          alignItems='center'
          justifyContent='center'
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={12} sm={8} md={6} component='main'>
            <Paper color='primary' elevation={0} className={classes.paper}>
              <Box textAlign='center'>
                <Logo />
              </Box>
              <Typography
                component='h4'
                variant='h6'
                align='center'
                noWrap
                style={{ marginTop: 40 }}
              >
                Log in to your account.
              </Typography>
              {alert && (
                <Alert severity='error' onClose={() => setAlert(false)}>
                  <AlertTitle>{error?.code}</AlertTitle>
                  {error?.message}
                </Alert>
              )}
              <Formik
                initialValues={{
                  email: '',
                  password: 'password',
                }}
                onSubmit={async ({ email, password }) => {
                  try {
                    await firebase
                      .auth()
                      .signInWithEmailAndPassword(email, password);
                  } catch (error) {
                    const errorCode =
                      error.code === 'auth/invalid-email'
                        ? 'Invalid email'
                        : error.code === 'auth/user-disabled'
                        ? 'Account disabled'
                        : 'User not found';
                    const errorMsg =
                      error.code === 'auth/wrong-password' ||
                      error.code === 'auth/user-not-found'
                        ? 'Either no user with that email exist or the password is invalid.'
                        : error.message;

                    setError({
                      code: errorCode,
                      message: errorMsg,
                    });
                    setAlert(true);
                  }
                }}
              >
                {(props) => <LoginForm formik={props} />}
              </Formik>
              <Typography variant='body2' style={{ marginTop: '2rem' }}>
                Don&#39;t have an account?
                <Link href={ROUTES.SIGNUP} color='primary'>
                  <strong> Sign up here.</strong>
                </Link>
              </Typography>
              <Typography
                paragraph
                variant='body2'
                style={{ marginTop: '2rem' }}
              >
                <Link href={ROUTES.PASSWORD_FORGET} color='primary'>
                  Forgot your password?
                </Link>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
