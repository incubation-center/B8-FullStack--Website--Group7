import { BookRequest } from "@/types";

export default function RenterTable({
  data,
  actions,
}: {
  data: BookRequest[];
  actions: {
    label: string;
    onClick: (request: BookRequest) => void;
    bgColor: string;
  }[];
}) {
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
          <td className='w-1/5'>Approval Date</td>
          <td className='w-1/5'>Return Date</td>
          <td className='w-fit'>Actions</td>
        </tr>
      </thead>

      <tbody>
        {data.map((request) => {
          const renter = request.borrower;

          return (
            <tr
              key={request.requestId}
              className='
                whitespace-nowrap
                text-left   
                border-y-2 border-primary 
                [&>*]:py-2 [&>*]:px-1
                text-primary
              '
            >
              <td className='w-1/5'>{renter.username}</td>
              <td className='w-2/5'>{renter.email}</td>
              <td className='w-1/5'>
                {request.dateOfAccepted!.toDateString()}
              </td>
              <td className='w-1/5'>{request.dateOfReturn!.toDateString()}</td>
              <td className='w-fit'>
                {actions.map((action) => (
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
          );
        })}

        {/* no data */}
        {data.length === 0 && (
          <tr className='text-center h-full '>
            <td colSpan={5} className='p-4 font-medium text-lg text-primary'>
              No renter found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
