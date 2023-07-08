import { useRouter } from 'next/router';
import LanguageSvg from './icon/locale/LanguageSvg';
import { Listbox } from '@headlessui/react';

import Image from 'next/image';
import { setCookie } from 'cookies-next';

export default function LocaleSwitching() {
  const router = useRouter();
  const { locales, locale, push, pathname, asPath, reload, events } = router;

  const handleSwitchLocale = (locale: string) => {
    setCookie('NEXT_LOCALE', locale);
    push(pathname, asPath, { locale: locale, shallow: false });
  };

  return (
    <div className='py-4 w-full '>
      <div className='w-full flex-1 flex flex-row justify-start items-center relative bg-alt-secondary bg-opacity-10 p-2 rounded-full'>
        <Listbox
          as='div'
          value={locale}
          onChange={(value) => handleSwitchLocale(value)}
          className='w-full'
        >
          <Listbox.Button
            className={`
            text-alt-secondary font-medium flex items-center gap-1 w-full px-2 
           
            ${locale === 'en' ? 'font-poppins' : 'font-kantumruy'}
            `}
          >
            <LanguageSvg className='w-6 h-6 fill-alt-secondary' />

            {locale === 'en' ? 'English' : 'ខ្មែរ'}

            <div className='flex-1'></div>

            <div className='relative h-6 w-6'>
              <Image
                src={`/icon/${locale === 'en' ? 'english' : 'khmer'}.svg`}
                alt='locale'
                fill
                className='mr-2 object-contain'
              />
            </div>
          </Listbox.Button>

          <Listbox.Options
            className='
              absolute bottom-full left-0 mb-2
              w-full
              bg-alt-secondary bg-opacity-10 rounded-3xl shadow-sm
              flex  flex-col gap-2 items-start text-alt-secondary
              overflow-hidden
            '
          >
            {(locales as string[]).map((locale) => (
              <Listbox.Option
                key={locale}
                value={locale}
                className={`
                  w-full p-2 px-4 font-medium
                  hover:bg-white hover:bg-opacity-10 flex gap-2 items-center 
                  ${locale === 'en' ? 'font-poppins' : 'font-kantumruy'}
                  select-none cursor-pointer
                `}
              >
                <div className='relative h-6 w-6'>
                  <Image
                    src={`/icon/${locale === 'en' ? 'english' : 'khmer'}.svg`}
                    alt='locale'
                    fill
                    className='mr-2 object-contain'
                  />
                </div>
                {locale === 'en' ? 'English' : 'ខ្មែរ'}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    </div>
  );
}
