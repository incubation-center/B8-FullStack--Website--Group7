import { BookRequest, RequestStatus } from '@/types';

export default function StatusLabel({ request }: { request: BookRequest }) {
  return (
    <div className='text-center'>
      {request.status === RequestStatus.PENDING && (
        <div
          className={`
            rounded-full 
            px-2 py-1 text-xs 
            md:text-sm md:px-4 md:py-2
            font-bold text-white w-28
            bg-secondary
          `}
        >
          Pending
        </div>
      )}
      {request.status === RequestStatus.ACCEPTED && (
        <div
          className={`
            rounded-full 
            px-2 py-1 text-xs 
            md:text-sm md:px-4 md:py-2
            font-bold text-white w-28
            bg-success
          `}
        >
          Active
        </div>
      )}
      {request.status === RequestStatus.ACHIEVED && (
        <div
          className={`
            rounded-full 
            px-2 py-1 text-xs 
            md:text-sm md:px-4 md:py-2
            font-bold text-white w-28
            ${request.isApproved ? 'bg-primary' : 'bg-danger'}
          `}
        >
          {request.isApproved ? 'Approved' : 'Rejected'}
        </div>
      )}
    </div>
  );
}
