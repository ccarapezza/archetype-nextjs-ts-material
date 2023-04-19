import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '@/src/theme';
import createEmotionCache from '@/src/createEmotionCache';
import "@/styles/globals.css";
import Layout from '../components/layout/Layout';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingBackdrop from '../components/LoadingBackdrop';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  // Hide splash screen shen we are server side 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader');
      if (loader)
        loader.style.display = 'none';
    }
  }, []);
  
  useEffect(() => {
    const handleRouteChange = (url: any, { shallow }: any) => {
      console.log(
        `App is changing to ${url} ${shallow ? 'with' : 'without'
        } shallow routing`
      )
      setOpen(true);
      return;
    };
    const handleRouteComplete = (url: any, { shallow }: any) => {
      console.log('you have finished going to the new page')
      setOpen(false);
      return;
    };

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SessionProvider session={pageProps.session}>
          <LoadingBackdrop open={open} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}