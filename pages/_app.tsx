import { processUserToken } from '@/service/token';
import '@/styles/globals.css';
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
      <div className='flex flex-grow h-screen w-screen overflow-clip'>
        <div className='flex flex-1'>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </div>

        <div id='modal-root' className='z-[9999]'></div>
      </div>
    </>
  );
}
