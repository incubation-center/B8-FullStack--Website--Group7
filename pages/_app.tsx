import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Library</title>
        <link
          rel='icon'
          type='image/x-icon'
          href='/icon/bookshelf-favicon.png'
        ></link>
      </Head>
      <div className='flex flex-grow h-screen w-screen overflow-hidden'>
        <div className='flex flex-1'>
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}
