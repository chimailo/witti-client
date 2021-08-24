import { createTheme } from '@material-ui/core/styles';

type PreferenceProps = {
  mode?: 'light' | 'dark';
  faveColor: string;
};

const preferences: PreferenceProps = {
  mode: 'light',
  faveColor: '#0ab396',
};

export const theme = createTheme({
  palette: {
    primary: {
      main: preferences.faveColor,
    },
    secondary: {
      main: '#e1e8ec',
    },
    background: {
      default: '#e1e8ec',
      paper: '#fafafa',
    },
    type: preferences.mode,
  },
  mixins: {
    toolbar: {
      minHeight: '54px',
    },
  },
});
