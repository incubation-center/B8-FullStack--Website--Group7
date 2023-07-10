import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ThemeSwitchingSvg from './icon/ThemeSwitchingSvg';
import { Themes, themes } from '@/utils/enum';
import { useTheme } from 'next-themes';

export default function ThemeSwitching() {
  const { theme, setTheme } = useTheme();

  return (
    <div className='w-full'>
      <div className='w-full flex-1 flex flex-row justify-start items-center relative '>
        <Listbox
          as='div'
          className='w-full 
          '
          value={theme}
          onChange={(theme: string) => setTheme(theme)}
        >
          <Listbox.Button
            className={`
              text-t-primary font-medium flex items-center gap-1 w-full px-4
              hover:scale-95 transition-transform duration-300
              bg-alt-secondary bg-opacity-10  rounded-full
              box-border border-0 border-alt-secondary p-2
            `}
          >
            <ThemeSwitchingSvg className='w-6 h-6 fill-alt-secondary' />

            <div className='flex-1'></div>
            <div className='flex gap-2'>
              <div className='h-4 w-4 bg-primary rounded-full'></div>
              <div className='h-4 w-4 bg-secondary rounded-full'></div>
              <div className='h-4 w-4 bg-alt-secondary rounded-full'></div>
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
              absolute bottom-full left-0 my-2
              w-full
              rounded-3xl shadow-sm
              flex  flex-col  items-start
              overflow-hidden
              border-2 border-white
            `}
            >
              {themes.map((theme) => (
                <Listbox.Option
                  key={theme.name}
                  value={theme.name}
                  className={`
                    w-full p-2 px-4 font-medium
                    hover:bg-stone-900 hover:bg-opacity-10 flex gap-2 items-center
                    select-none cursor-pointer
                  `}
                  style={{
                    backgroundColor: theme.primary,
                    color: theme.textColorSecondary
                  }}
                >
                  {/* <div className='relative h-6 w-6'>
                    <Image
                      src={`/icon/${locale === 'en' ? 'english' : 'khmer'}.svg`}
                      alt='locale'
                      fill
                      className='mr-2 object-contain'
                    />
                  </div>
                  {locale === 'en' ? 'English' : 'ខ្មែរ'} */}
                  <div>{theme.title}</div>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
    </div>
  );
}
