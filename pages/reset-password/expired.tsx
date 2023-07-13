import LocaleSwitching from '@/components/LocaleSwitching';
import LinkExpiredSvg from '@/components/icon/LinkExpiredSvg';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LinkExpired() {
  const router = useRouter();

  const { t } = useTranslation('forgot-password');

  return (
    <div
      className='
        p-4
        bg-primary text-alt-secondary 
        w-full h-full flex flex-col justify-center items-center space-y-8
        text-center
      '
    >
      <div>
        <LinkExpiredSvg className='w-20 h-20 stroke-alt-secondary' />
        <h1>{t('expired-tab.link-expired')}</h1>
      </div>
      <p className='whitespace-pre-line'>{t('expired-tab.expired-tab-p')}</p>
      <div>
        <Link href='/forgot-password' locale={router.locale}>
          <span className='bg-alt-secondary px-4 py-2 rounded-full text-primary font-medium'>
            {t('expired-tab.back-to-forgot-pass-btn')}
          </span>
        </Link>
      </div>

      <div className='w-2/3 md:w-1/3 max-w-[300px]'>
        <LocaleSwitching className='bg-opacity-10 fill-alt-secondary' />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const locale = context.locale as string;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['forgot-password']))
    }
  };
}
