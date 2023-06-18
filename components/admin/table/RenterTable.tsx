import { BookRequest } from '@/types';

export default function RenterTable({ data }: { data: BookRequest[] }) {
  return (
    <table className='w-full'>
      <thead>
        <tr
          className='
            whitespace-nowrap
            text-left text-primary font-bold text-lg
            border-b-2 border-primary 
            [&>*]:py-1 [&>*]:px-1
          '
        >
          <td className='w-1/5'>Name</td>
          <td className='w-2/5'>Email</td>
          <td className='w-1/5'>Approval date</td>
          <td className='w-1/5'>Return date</td>
        </tr>
      </thead>

      {/* help me render data into rows */}
      <tbody>
        {data.map((request) => {
          const renter = request.borrower;

          if (request.status !== 'Achieved') return null;

          return (
            <tr
              key={request.requestId}
              className='
                whitespace-nowrap
                text-left   
                border-y-2 border-primary 
                [&>*]:py-1 [&>*]:px-1
              '
            >
              <td className='w-1/5'>{renter.username}</td>
              <td className='w-2/5'>{renter.email}</td>
              <td className='w-1/5'>
                {request.dateOfAccepted!.toDateString()}
              </td>
              <td className='w-1/5'>{request.dateOfReturn!.toDateString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
