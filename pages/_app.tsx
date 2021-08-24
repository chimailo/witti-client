import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Hydrate } from 'react-query/hydration';
import { QueryClient, QueryClientProvider } from 'react-query';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import AuthContext from '../src/lib/auth-context';
import { setAxiosDefaultParams } from '../src/lib/axiosConfig';
import { theme } from '../src/lib/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  setAxiosDefaultParams();

  return (
    <React.Fragment>
      <Head>
        <title>Witti</title>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthContext>
              <Component {...pageProps} />
            </AuthContext>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </React.Fragment>
  );
}
