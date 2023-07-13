/* eslint-disable @next/next/no-img-element */
import { Book, BookRequest, RequestStatus } from '@/types';

import Image from 'next/image';

import { motion } from 'framer-motion';
import StatusLabel from './StatusLabel';
import { useTranslation } from 'next-i18next';
import { useLocale } from '@/utils/function';

export default function RequestTable({
  data,
  actions,
}: {
  data: BookRequest[];
  actions?: {
    label: string;
    onClick: (request: BookRequest) => void;
    bgColor: string;
  }[];
}) {
  const { t } = useTranslation('homepage');

  const { isKhmer } = useLocale();

  return (
    <table className='w-full  '>
      <thead>
        <tr
          className='
            border-b-2 border-primary 
            font-bold text-lg md:text-lg text-primary 
            text-center
            [&>td]:py-4 w-full 
            [&<td]:w-fit
          '
        >
          <td className='w-full text-left pl-2 whitespace-nowrap'>
            {t('request-tab.table.book', 'Book')}
          </td>
          <td className='hidden lg:table-cell whitespace-nowrap'>
            {t('request-tab.table.date', 'Date')}
          </td>
          <td className='hidden md:table-cell whitespace-nowrap'>
            {t('request-tab.table.status', 'Status')}
          </td>
          <td className='whitespace-nowrap'>
            {t('request-tab.table.action', 'Actions')}
          </td>
        </tr>
      </thead>
      <tbody>
        {data.map((request) => (
          <motion.tr
            layout
            key={request.requestId}
            className='
              border-b-2 border-primary
              text-primary text-base
              w-full
              [&>td]:p-2
              [&>td]:whitespace-nowrap
            '
          >
            <td className='w-full flex flex-grow gap-2 items-center justify-start'>
              <div className='relative w-14 h-20 hidden md:block'>
                <Image
                  src={request.book.bookImg}
                  alt={request.book.title}
                  fill
                  className='object-scale-down object-left'
                />
              </div>

              <div className='whitespace-pre-wrap text-left'>
                {request.book.title.length > 50
                  ? request.book.title.slice(0, 50) + '...'
                  : request.book.title}
              </div>
            </td>

            <td className='hidden lg:table-cell'>
              {request.dateOfRequest.toLocaleDateString()}
            </td>

            <td className='hidden md:table-cell'>
              <StatusLabel request={request} />
            </td>

            <td>
              {actions?.map((action) => (
                <button
                  key={action.label}
                  className={`
                    rounded-full 
                    px-2 py-1 text-xs
                    md:text-sm md:px-4 md:py-2
                    text-primary mr-2 
                    ${isKhmer ? 'font-medium' : 'font-bold'}
                    ${action.bgColor}
                    hover:bg-opacity-80
                  `}
                  onClick={() => action.onClick(request)}
                >
                  {action.label}
                </button>
              ))}
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
}
