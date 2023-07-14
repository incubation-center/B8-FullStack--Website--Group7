import { useRouter } from 'next/router';
import LanguageSvg from './icon/locale/LanguageSvg';
import { Listbox, Transition } from '@headlessui/react';

import Image from 'next/image';
import { setCookie } from 'cookies-next';
import { Fragment, HTMLAttributes } from 'react';

export default function LocaleSwitching({
  position = 'top',
  className = ''
}: {
  position?: 'bottom' | 'top';
  className?: HTMLAttributes<HTMLDivElement>['className'];
}) {
  const router = useRouter();
  const { locales, locale, replace, pathname, asPath, reload, events } = router;

  const handleSwitchLocale = (locale: string) => {
    if (locale === router.locale) return;

    setCookie('NEXT_LOCALE', locale);
    replace(pathname, asPath, { locale: locale, shallow: false });
  };

  const selectModalPosition = () => {
    switch (position) {
      case 'bottom':
        return 'top-full';
      case 'top':
        return 'bottom-full';
      default:
        return 'top-full';
    }
  };

  return (
    <div className='w-full'>
      <div className='w-full flex-1 flex flex-row justify-start items-center relative '>
        <Listbox
          as='div'
          value={locale}
          onChange={(value) => handleSwitchLocale(value)}
          className='w-full 
          
          '
        >
          <Listbox.Button
            className={`
            text-alt-secondary font-medium flex items-center gap-1 w-full px-4
            hover:scale-95 transition-transform duration-300 p-2 rounded-full
            ${locale === 'en' ? 'font-poppins' : 'font-kantumruy'}
            bg-alt-secondary bg-opacity-10
            ${className} 
            `}
          >
            <LanguageSvg className='w-6 h-6 fill-inherit' />

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

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Listbox.Options
              className={`
              absolute ${selectModalPosition()} left-0 my-2
              w-full
              bg-alt-secondary text-t-primary rounded-3xl shadow-sm
              flex  flex-col gap-2 items-start
              overflow-hidden
              z-[99999]

            `}
            >
              {(locales as string[]).map((locale) => (
                <Listbox.Option
                  key={locale}
                  value={locale}
                  className={`
                  w-full p-2 px-4 font-medium
                  hover:bg-stone-900 hover:bg-opacity-10 flex gap-2 items-center 
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
          </Transition>
        </Listbox>
      </div>
    </div>
  );
}
