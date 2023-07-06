/* eslint-disable @next/next/no-img-element */
import { BookRequest } from '@/types';

import Image from 'next/image';

export default function RequestTable({
  data,
  actions
}: {
  data: BookRequest[];
  actions?: {
    label: string;
    onClick: (request: BookRequest) => void;
    bgColor: string;
  }[];
}) {
  return (
    <table className='w-full  '>
      <thead>
        <tr
          className='
            border-b-2 border-primary 
            font-bold text-base md:text-lg text-primary 
            [&>td]:py-4 w-full
            [&<td]:w-fit [&<td]:whitespace-nowrap
          '
        >
          <td className='w-full'>Book</td>
          <td className='hidden lg:table-cell'>Date</td>
          <td className='hidden md:table-cell'>Status</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {data.map((request) => (
          <tr
            key={request.requestId}
            className='
              border-b-2 border-primary
              text-primary text-base
              w-full
              [&>td]:p-2
              [&>td]:whitespace-nowrap
            '
          >
            <td className='w-full flex flex-grow gap-2 items-center'>
              <div className='relative w-14 h-20 hidden md:block'>
                <Image
                  src={request.book.bookImg}
                  alt={request.book.title}
                  fill
                  className='object-scale-down'
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
              {request.status === 'PENDING' ? (
                <div
                  className={`
                    rounded-full 
                    px-2 py-1 text-xs 
                    md:text-sm md:px-4 md:py-2
                    font-bold text-white w-fit
                    bg-secondary
                  `}
                >
                  Pending
                </div>
              ) : (
                <div
                  className={`
                    rounded-full 
                    px-2 py-1 text-xs 
                    md:text-sm md:px-4 md:py-2
                    font-bold text-white w-fit
                    ${request.isApproved ? 'bg-success' : 'bg-danger'}
                  `}
                >
                  {request.isApproved && 'Approved'}
                  {!request.isApproved && 'Rejected'}
                </div>
              )}
            </td>

            <td>
              {actions?.map((action) => (
                <button
                  key={action.label}
                  className={`
                    rounded-full 
                    px-2 py-1 text-xs
                    md:text-sm md:px-4 md:py-2
                    text-primary font-bold mr-2 
                    ${action.bgColor}
                    hover:bg-opacity-80
                  `}
                  onClick={() => action.onClick(request)}
                >
                  {action.label}
                </button>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
