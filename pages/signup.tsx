import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Paper, Typography, Grid, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

import CircularLoading from '../src/components/Loading';
import firebase from '../src/lib/firebase';
import Link from '../src/components/Link';
import Logo from '../src/components/svg/logo';
import SignupForm from '../src/components/forms/Signup';
import { setToken } from '../src/lib/utils';
import { useAuth } from '../src/lib/auth-context';
import {
  validateName,
  validateEmail,
  validateUsername,
  validatePassword,
  validatePasswordConfirm,
} from '../src/lib/validators';
import * as ROUTES from '../src/lib/routes';
import { useSignup } from '../src/lib/hooks/user';

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
    loading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    },
  })
);

interface AuthError {
  code: string;
  message: string;
}

export default function Signup() {
  const [error, setError] = useState<AuthError>();
  const [alert, setAlert] = useState(false);
  const classes = useStyles();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { mutate, data, isLoading } = useSignup();

  useEffect(() => {
    if (isAuthenticated && data && !isLoading) {
      router.replace(ROUTES.HOME);
    }
  }, [isAuthenticated, data, isLoading, router]);

  if (isLoading) {
    return (
      <div className={classes.loading}>
        <CircularLoading size={40} />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Head>
        <title>Sign up | LeanUrls</title>
      </Head>
      <div className={classes.wrapper}>
        <Grid container alignItems='center' justifyContent='center'>
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
                Create your account.
              </Typography>
              {alert && (
                <Alert severity='error' onClose={() => setAlert(false)}>
                  <AlertTitle>{error?.code}</AlertTitle>
                  {error?.message}
                </Alert>
              )}
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  username: '',
                  password: 'password',
                  password2: 'password',
                }}
                validateOnChange={false}
                validationSchema={Yup.object({
                  name: validateName(),
                  email: validateEmail(),
                  username: validateUsername(),
                  password: validatePassword(),
                  password2: validatePasswordConfirm(),
                })}
                onSubmit={async ({ name, email, username, password }) => {
                  try {
                    const { user } = await firebase
                      .auth()
                      .createUserWithEmailAndPassword(email, password);

                    if (user) {
                      setToken(await user.getIdToken());
                      mutate({
                        id: user.uid,
                        name,
                        username,
                        email,
                      });
                    }
                  } catch (err) {
                    setError({
                      code: 'Error',
                      message: err.message,
                    });
                    setAlert(true);
                  }
                }}
              >
                {(props) => <SignupForm formik={props} />}
              </Formik>
              <Typography
                variant='body2'
                style={{ marginTop: '2rem' }}
                gutterBottom
              >
                Already have an account?
                <Link href={ROUTES.LOGIN} color='primary'>
                  <strong> Login here.</strong>
                </Link>
              </Typography>
              <Typography variant='body2' paragraph>
                By clicking the sign up button, you agree to our
                <Link href={ROUTES.TERMS} color='primary'>
                  {' terms'}
                </Link>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
