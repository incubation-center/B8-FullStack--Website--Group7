import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';

import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
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
      <div className='flex-1 flex flex-grow h-full w-screen overflow-clip'>
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
