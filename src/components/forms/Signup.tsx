import React from 'react';
import { FormikProps } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      maxWidth: 400,
      margin: 'auto',
    },
    field: {
      marginTop: theme.spacing(3),
    },
    button: {
      borderRadius: 8,
      fontSize: '1rem',
      textTransform: 'capitalize',
      marginTop: theme.spacing(4),
      color: theme.palette.background.paper,
      fontWeight: theme.typography.fontWeightRegular,
    },
  })
);

export default function SignupForm({
  formik,
}: {
  formik: FormikProps<{
    name: string;
    email: string;
    username: string;
    password: string;
    password2: string;
  }>;
}) {
  const classes = useStyles();
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        name='name'
        label='Your Name'
        type='name'
        size='small'
        className={classes.field}
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={errors.name && touched.name && errors.name}
        error={!!(touched.name && errors.name)}
        fullWidth
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <PersonIcon color='disabled' />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        name='username'
        label='Userame'
        type='username'
        size='small'
        className={classes.field}
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={errors.username && touched.username && errors.username}
        error={!!(touched.username && errors.username)}
        fullWidth
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <PersonIcon color='disabled' />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        name='email'
        label='Email'
        type='email'
        size='small'
        className={classes.field}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={errors.email && touched.email && errors.email}
        error={!!(touched.email && errors.email)}
        fullWidth
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <MailIcon color='disabled' />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        name='password'
        label='Password'
        type='password'
        size='small'
        className={classes.field}
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={errors.password && touched.password && errors.password}
        error={!!(touched.password && errors.password)}
        fullWidth
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <LockIcon color='disabled' />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        name='password2'
        label='Confirm Your Password'
        type='password'
        size='small'
        className={classes.field}
        value={values.password2}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={errors.password2 && touched.password2 && errors.password2}
        error={!!(touched.password2 && errors.password2)}
        fullWidth
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <LockIcon color='disabled' />
            </InputAdornment>
          ),
        }}
      />
      <Button
        type='submit'
        color='primary'
        variant='contained'
        className={classes.button}
        disabled={isSubmitting}
        disableElevation
        fullWidth
      >
        Sign Up
      </Button>
    </form>
  );
}
