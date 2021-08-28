import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import Link from '../Link';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      width: '50%',
      display: 'flex',
      backgroundColor: theme.palette.background.paper,
    },
    button: {
      width: '100%',
      textTransform: 'capitalize',
      minHeight: '54px',
      fontWeight: theme.typography.fontWeightBold,
      padding: theme.spacing(2),
      transition: theme.transitions.create('all'),
      color: theme.palette.text.secondary,
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  })
);

export default function FollowTab({ username }: { username?: string }) {
  const router = useRouter();

  return (
    <AppBar position='static' color='default' elevation={0}>
      <Toolbar>
        <TabLink label='followers' to={`/${username}/followers`} />
        <TabLink label='following' to={`/${username}/following`} />
      </Toolbar>
    </AppBar>
  );
}

function TabLink({ to, label }: { to: string; label: string }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Link
      underline='none'
      align='center'
      className={classes.button}
      activeStyle={{
        color: theme.palette.primary.main,
        borderBottom: `2px solid ${theme.palette.primary.main}`,
      }}
      href={to}
    >
      {label}
    </Link>
  );
}
