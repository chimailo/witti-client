import React from "react";
import { FormikProps } from "formik";
import { Button, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailIcon from '@material-ui/icons/Mail';

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
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

export default function SignupForm({formik}: {formik: FormikProps<{
    email: string;
  }>}) {
  const classes = useStyles();
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = formik
  
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        name='email'
        label='Enter your email'
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
            <InputAdornment position="end">
            <MailIcon color='disabled' />
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
        Submit
      </Button>
    </form>
  )
}