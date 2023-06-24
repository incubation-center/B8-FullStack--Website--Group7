import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Head from 'next/head';
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
      <div className='flex flex-grow h-screen w-screen overflow-clip transition-colors duration-300 '>
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

        <div id='modal-root'></div>
      </div>
    </>
  );
}
