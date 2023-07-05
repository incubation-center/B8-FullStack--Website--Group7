/* eslint-disable @next/next/no-img-element */
import { Listbox, Transition } from '@headlessui/react';
import RequiredIcon from '../login/RequiredIcon';
import { Fragment } from 'react';
import ExpandSvg from '../icon/ExpandSvg';

export default function EditBookCategory({
  options,
  selectedOption,
  setSelectedOption,
  disabled
}: {
  options: { value: string; label: string }[];
  selectedOption: { value: string; label: string };
  setSelectedOption: (value: { value: string; label: string }) => void;
  disabled: boolean;
}) {
  return (
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
            className={`
          w-full
          bg-transparent
          ${
            !disabled
              ? 'border-b-2 border-alt-secondary'
              : 'border-b-2 border-primary'
          }
          flex items-center justify-between py-2
          transition-colors duration-300
        `}
          >
            <span className='text-alt-secondary'>{selectedOption.label}</span>

            {!disabled && (
              <ExpandSvg
                className='w-6 h-auto mr-2 stroke-alt-secondary'
                isExpanded={open}
              />
            )}
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
                  bg-alt-secondary 
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
                  <div className='flex gap-2'>
                    <img
                      src='/icon/selected.png'
                      alt='check'
                      className={`w-6 h-6 ${
                        selectedOption.value === category.value
                          ? 'block'
                          : 'invisible'
                      }`}
                    />

                    <span className={` block truncate`}>{category.label}</span>
                  </div>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
}
