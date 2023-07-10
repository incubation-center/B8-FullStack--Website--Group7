/* eslint-disable @next/next/no-img-element */
import { Listbox, Transition } from '@headlessui/react';
import RequiredIcon from '../login/RequiredIcon';
import { Fragment } from 'react';

import EducationSvg from '../icon/book-category/Education';
import BusinessSvg from '../icon/book-category/Business';
import DramaSvg from '../icon/book-category/Drama';
import FantasySvg from '../icon/book-category/Fantasy';
import HistorySvg from '../icon/book-category/History';
import SelfDevelopmentSvg from '../icon/book-category/SelfDevelopment';
import { BookCategory } from '@/utils/enum';
import ExpandSvg from '../icon/ExpandSvg';

export default function CustomListDropDown({
  options,
  selectedOption,
  setSelectedOption,
  label,
  disabled = false
}: {
  options: { value: string; label: string }[];
  selectedOption: { value: string; label: string };
  setSelectedOption: (value: { value: string; label: string }) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <div className='grid gap-4 grid-cols-4'>
      <label
        htmlFor='author'
        className='text-primary font-medium whitespace-nowrap'
      >
        Category
        <RequiredIcon />
      </label>

      <Listbox
        as='div'
        value={options}
        onChange={(value) => setSelectedOption(value as any)}
        className='col-span-3 relative'
        disabled={disabled}
      >
        {({ open }) => (
          <>
            <Listbox.Button
              className='
               w-full
               bg-transparent
               border-b border-primary
               flex items-center justify-between p-1
             '
            >
              <div className='flex items-center gap-2'>
                <span>
                  <CategoryIcon category={selectedOption.value} />
                </span>
                <span className='text-primary'>{selectedOption.label}</span>
              </div>

              <ExpandSvg
                className='w-6 h-auto -mr-2 stroke-primary'
                isExpanded={open}
              />
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              enter='transition ease-out duration-100'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100'
            >
              <Listbox.Options
                className='
                 absolute top-12 left-0
                 bg-white 
                 shadow-2xl
                 rounded-xl
                 z-10
                 overflow-clip
               '
              >
                {options.map((category) => (
                  <Listbox.Option
                    key={category.value}
                    value={category}
                    className={({ active }) =>
                      `${active ? ' bg-primary bg-opacity-10' : ''}
                     text-primary cursor-pointer select-none relative py-2 px-4 pl-2
                     hover:bg-primary hover:bg-opacity-30
                       overflow-clip
                       
                     `
                    }
                  >
                    <div className='flex items-center gap-2'>
                      <img
                        src='/icon/selected.png'
                        alt='check'
                        className={`w-6 h-6 ${
                          selectedOption.value === category.value
                            ? 'block'
                            : 'invisible'
                        }`}
                      />

                      <CategoryIcon category={category.value} />
                      <span className={` block truncate`}>
                        {category.label}
                      </span>
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
}

function CategoryIcon({ category }: { category: string }) {
  switch (category) {
    case BookCategory.EDUCATION:
      return <EducationSvg className='h-4 w-4 fill-primary' />;
    case BookCategory.BUSINESS:
      return <BusinessSvg className='h-4 w-4 fill-primary stroke-primary' />;
    case BookCategory.DRAMA:
      return <DramaSvg className='h-4 w-4 fill-primary' />;
    case BookCategory.FANTASY:
      return <FantasySvg className='h-4 w-4 fill-primary' />;
    case BookCategory.HISTORY:
      return <HistorySvg className='h-4 w-4 fill-primary stroke-primary' />;
    case BookCategory.SELF_DEVELOPMENT:
      return (
        <SelfDevelopmentSvg className='h-4 w-4 fill-primary stroke-primary' />
      );
  }

  return null;
}
