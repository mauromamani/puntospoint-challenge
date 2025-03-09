import { Providers } from 'src/core/providers';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GA4 } from '../src/core/ga4';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Desafío Front-end</title>
      </Head>

      <GA4 />

      <Providers>
        <Component {...pageProps} />
      </Providers>
    </>
  );
};

export default MyApp;
