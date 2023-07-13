/* eslint-disable @next/next/no-img-element */
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, HTMLAttributes, useEffect } from 'react';
import ThemeSwitchingSvg from './icon/ThemeSwitchingSvg';
import { Themes, themes } from '@/utils/enum';
import { useTheme } from 'next-themes';
import SelectedSvg from './icon/SelectedSvg';

export default function ThemeSwitching({
  className = '',
  position = 'top'
}: {
  className?: HTMLAttributes<HTMLDivElement>['className'];
  position?: 'bottom' | 'top';
}) {
  const { theme: currentTheme, setTheme } = useTheme();

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
          className='w-full 
          '
          value={currentTheme}
          onChange={(theme: string) => setTheme(theme)}
        >
          <Listbox.Button
            className={`
              text-t-primary font-medium flex items-center gap-1 w-full px-4
              hover:scale-95 transition-transform duration-300
              bg-alt-secondary bg-opacity-10  rounded-full
              box-border border-0 border-alt-secondary p-2
              ${className}
            `}
          >
            <ThemeSwitchingSvg className='w-6 h-6 fill-inherit' />

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
              absolute ${selectModalPosition()} left-0 my-2
              w-full
              rounded-3xl
              flex  flex-col  items-start
              overflow-hidden
              ring-2 ring-background ring-opacity-20
              shadow-xl
            `}
            >
              {themes.map((theme) => (
                <Listbox.Option
                  key={theme.name}
                  value={theme.name}
                  className={`
                    w-full p-2 pl-3 font-medium
                    hover:bg-stone-900 hover:bg-opacity-10 flex gap-2 items-center
                    select-none cursor-pointer
                  `}
                  style={{
                    backgroundColor: theme.primary,
                    color: theme.altSecondary
                  }}
                >
                  <SelectedSvg
                    className={`w-4 h-4 fill-alt-secondary ${
                      theme.name === currentTheme ? 'block' : 'invisible'
                    }`}
                  />
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
