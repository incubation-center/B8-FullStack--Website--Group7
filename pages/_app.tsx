import { processUserToken } from '@/service/token';
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { deleteCookie, getCookie } from 'cookies-next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

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
      <div className='flex-1 flex flex-grow h-full w-screen overflow-clip'>
        <div className='flex flex-1'>
          <RecoilRoot>
            <ThemeProvider
              defaultTheme='default'
              enableSystem={false}
              disableTransitionOnChange
            >
              <Component {...pageProps} />
            </ThemeProvider>
          </RecoilRoot>
        </div>

        <div id='modal-root' className='z-[9999]'></div>
      </div>
    </>
  );
}
