/* eslint-disable @next/next/no-img-element */
import { BookRequest } from '@/types';
import { AdminTab } from '@/utils/enum';

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
  return (
    <table className='w-full '>
      <thead>
        <tr
          className='
            border-b-2 border-primary 
            font-bold text-xl text-primary 
            [&>td]:py-4 w-full
            [&<td]:w-fit [&<td]:whitespace-nowrap
          '
        >
          <td className='w-2/5'>Book</td>
          <td>Username</td>
          {useIn === AdminTab.INCOMING_REQUEST && <td>Request date</td>}
          {useIn === AdminTab.ACTIVE_REQUEST && <td>Due date</td>}
          {useIn === AdminTab.ARCHIVED_REQUEST && <td>Return date</td>}
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {data.map((request) => (
          <tr
            key={request.requestId}
            className='
              border-b-2 border-primary
              text-primary text-xl
              w-full
              [&>td]:p-2
              [&>td]:whitespace-nowrap
            '
          >
            <td className='w-full flex flex-grow gap-2 items-center'>
              <img
                src={request.book.bookImg}
                alt={request.book.title}
                className='w-14'
              />
              <div className='whitespace-pre text-center'>
                {request.book.title}
              </div>
            </td>
            <td>{request.borrower.username}</td>

            {useIn === AdminTab.INCOMING_REQUEST && (
              <td>{request.dateOfRequest.toLocaleString()}</td>
            )}

            {useIn === AdminTab.ACTIVE_REQUEST && (
              <td>{request.dateOfReturn!.toLocaleString()}</td>
            )}

            {useIn === AdminTab.ARCHIVED_REQUEST && (
              <td>{request.dateOfReceived!.toLocaleString()}</td>
            )}

            <td>
              {actions?.map((action) => (
                <button
                  key={action.label}
                  className={`
                    rounded-full px-4 py-2 
                    text-sm text-primary font-bold mr-2 
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
