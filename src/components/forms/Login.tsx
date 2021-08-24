import React from 'react';
import { FormikProps } from 'formik';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import MailIcon from '@material-ui/icons/Mail';
import { Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      marginTop: theme.spacing(2),
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

export default function LoginForm({
  formik,
}: {
  formik: FormikProps<{
    email: string;
    password: string;
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
    <form onSubmit={handleSubmit}>
      <TextField
        name='email'
        label='Email'
        type='text'
        size='small'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <MailIcon color='disabled' />
            </InputAdornment>
          ),
        }}
        variant='outlined'
        className={classes.field}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={errors.email && touched.email && errors.email}
        error={!!(touched.email && errors.email)}
        fullWidth
      />
      <TextField
        name='password'
        label='Password'
        type='password'
        size='small'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <LockIcon color='disabled' />
            </InputAdornment>
          ),
        }}
        variant='outlined'
        className={classes.field}
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={errors.password && touched.password && errors.password}
        error={!!(touched.password && errors.password)}
        fullWidth
      />
      <Button
        type='submit'
        color='primary'
        variant='contained'
        className={classes.button}
        disableElevation
        fullWidth
        disabled={isSubmitting}
      >
        Login
      </Button>
    </form>
  );
}
