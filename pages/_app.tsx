import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';

import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { setCookie } from 'cookies-next';

function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  // useEffect(() => {
  //   setCookie('NEXT_LOCALE', locale);
  // }, [locale]);

  return (
    <>
      <Head>
        <title>Library</title>
        <link
          rel='icon'
          type='image/x-icon'
          href='/icon/bookshelf-favicon.png'
        />
      </Head>
      <div
        className={`
          flex-1 flex flex-grow h-full w-screen overflow-clip 
          ${locale === 'en' ? 'font-poppins' : 'font-kantumruy'}
        `}
      >
        <div className='flex flex-1'>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </div>

        <div id='modal-root' className='z-[9999999]'></div>
      </div>
    </>
  );
}

export default appWithTranslation(App);
