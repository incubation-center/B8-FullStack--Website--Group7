'use client';

/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import { motion } from 'framer-motion';

import { BookRequest } from '@/types';
import { AdminTab } from '@/utils/enum';
import { useRecoilValue } from 'recoil';
import { isRefreshingRequestAtom } from '@/service/recoil/admin';
import { useTranslation } from 'next-i18next';

interface RequestTableProps {
  data: BookRequest[];
  actions?: {
    label: string;
    onClick: (request: BookRequest) => void;
    bgColor: string;
  }[];
  useIn:
    | AdminTab.INCOMING_REQUEST
    | AdminTab.ACTIVE_REQUEST
    | AdminTab.ARCHIVED_REQUEST;
}

export default function RequestTable({
  data,
  actions,
  useIn
}: RequestTableProps) {
  const { t } = useTranslation('admin');

  const isRefreshing = useRecoilValue(isRefreshingRequestAtom);

  return (
    <table className='w-full '>
      <thead>
        <tr
          className='
            border-b-2 border-primary 
            font-bold text-xl text-primary 
            [&>td]:py-4 w-full
            [&>td]:w-fit [&>td]:whitespace-nowrap
          '
        >
          <td className='w-2/5'>{t('request-table.book')}</td>
          <td>{t('request-table.username')}</td>
          {useIn === AdminTab.INCOMING_REQUEST && (
            <td>{t('request-table.request-date')}</td>
          )}
          {useIn === AdminTab.ACTIVE_REQUEST && (
            <td>{t('request-table.to-be-returned-date')}</td>
          )}
          {useIn === AdminTab.ARCHIVED_REQUEST && (
            <td>{t('request-table.status')}</td>
          )}
          <td>{t('request-table.actions')}</td>
        </tr>
      </thead>
      <tbody>
        {data.map((request) => (
          <motion.tr
            layout
            key={request.requestId}
            className='
              border-b-2 border-primary
              text-primary text-lg
              w-full
              [&>td]:p-2
              [&>td]:whitespace-pre-wrap
            '
          >
            <td className=''>
              <div className='flex flex-grow gap-2 items-center'>
                {/* <img
                  src={request.book.bookImg}
                  alt={request.book.title}
                  className='w-14'
                /> */}
                <div className='relative w-14 h-20 hidden md:block'>
                  <Image
                    src={request.book.bookImg}
                    alt={request.book.title}
                    fill
                    className='object-contain'
                  />
                </div>
                <div className='whitespace-pre-wrap text-left'>
                  {request.book.title.length > 50
                    ? request.book.title.slice(0, 50) + '...'
                    : request.book.title}
                </div>
              </div>
            </td>
            <td>{request.borrower.username}</td>

            {useIn === AdminTab.INCOMING_REQUEST && (
              <td>
                {request.dateOfRequest
                  .toLocaleString()
                  .replace(/:\d{2}\s/, ' ')}
              </td>
            )}

            {useIn === AdminTab.ACTIVE_REQUEST && (
              <td>{request.dateOfReturn!.toLocaleDateString()}</td>
            )}

            {useIn === AdminTab.ARCHIVED_REQUEST && (
              <td>
                <div
                  className={`
                    rounded-full px-4 py-2 text-sm font-bold text-white w-fit
                    ${request.isApproved ? 'bg-success' : 'bg-danger'}
                  `}
                >
                  {request.isApproved && t('btns.approved')}
                  {!request.isApproved && t('btns.rejected')}
                </div>
              </td>
            )}

            <td>
              {actions?.map((action) => (
                <button
                  key={action.label}
                  className={`
                    rounded-full px-4 py-2 
                    text-sm text-primary font-bold m-1
                    ${action.bgColor}
                    ${
                      !isRefreshing
                        ? 'hover:opacity-80'
                        : 'cursor-not-allowed opacity-60'
                    }

                  `}
                  onClick={() => {
                    action.onClick(request);
                  }}
                  disabled={isRefreshing}
                >
                  {action.label}
                </button>
              ))}
            </td>
          </motion.tr>
        ))}

        {data.length === 0 && (
          <tr className='text-primary text-xl'>
            <td colSpan={5} className='text-center p-4'>
              {t('request-table.no-request')}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
