import React from 'react';
import { Box, Typography, Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { LinkIcon, WandIcon } from '../svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      fontWeight: theme.typography.fontWeightMedium,
      marginLeft: theme.spacing(1),
    },
    button: {
      borderRadius: 8,
      letterSpacing: 1.1,
      textTransform: 'capitalize',
      marginTop: theme.spacing(3),
      padding: theme.spacing(1.5, 4),
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

interface FormProps {
  link: string;
  alias: string;
}

interface TouchedProps {
  link: boolean;
  alias: boolean;
}

interface NewLinkFormProps {
  values: FormProps;
  errors: FormProps;
  touched: TouchedProps;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function NewLinkForm(props: NewLinkFormProps) {
  const classes = useStyles();
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Box display='flex' alignItems='center' mt={3} mb={1}>
        <LinkIcon
          viewBox='0 0 511.999 511.999'
          color='secondary'
          fontSize='small'
        />
        <Typography
          variant='subtitle1'
          align='center'
          color='secondary'
          className={classes.label}
        >
          Enter a long URL to make a LeanUrl
        </Typography>
      </Box>
      <TextField
        name='link'
        type='text'
        variant='outlined'
        color='secondary'
        value={values.link}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        helperText={errors.link && touched.link && errors.link}
        error={!!(touched.link && errors.link)}
        fullWidth
      />
      <Box display='flex' alignItems='center' mt={3} mb={1}>
        <WandIcon viewBox='0 0 512 512' color='secondary' fontSize='small' />
        <Typography
          variant='subtitle1'
          align='center'
          color='secondary'
          className={classes.label}
        >
          Customize your link
        </Typography>
      </Box>
      <TextField
        name='alias'
        type='text'
        variant='outlined'
        color='secondary'
        placeholder='alias'
        value={values.alias}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        helperText={errors.alias && touched.alias && errors.alias}
        error={!!(touched.alias && errors.alias)}
        fullWidth
      />
      <Box display='flex' alignItems='center' justifyContent='flex-end'>
        <Button
          disableElevation
          fullWidth
          type='submit'
          size='large'
          color='primary'
          variant='contained'
          className={classes.button}
          disabled={isSubmitting}
        >
          Make LeanUrl
        </Button>
      </Box>
    </form>
  );
}
