import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function UnauthorizedPage() {
  const router = useRouter();

  const { t } = useTranslation('common');

  useEffect(() => {
    router.prefetch('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className='
            flex flex-col items-center justify-center
            w-full h-screen
            bg-primary
        '
    >
      <h1
        className='
                text-4xl text-alt-secondary font-bold
            '
      >
        401
      </h1>
      <h2
        className='
                text-2xl text-alt-secondary font-bold
            '
      >
        {t('unauthorized-page.unauthorized')}
      </h2>

      <p
        className='
                text-alt-secondary text-lg font-medium
            '
      >
        {t('unauthorized-page.p-not-authorized')}
      </p>

      <button
        className='
            bg-alt-secondary text-primary px-4 py-2 rounded-full
            text-lg font-medium mt-4
          '
        onClick={() => router.replace('/')}
      >
        {t('unauthorized-page.go-back-to-home-btn')}
      </button>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const locale = context.locale as string;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}
