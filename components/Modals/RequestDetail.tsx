/* eslint-disable @next/next/no-img-element */
import { BookRequest } from '@/types';

export default function RequestDetail({
  request
}: {
  request: BookRequest | null;
}) {
  return (
    <div className='w-full flex flex-col gap-4 p-[30px] bg-white rounded-xl'>
      {/* show loading if request null  */}
      {request && (
        <div className='w-fit flex gap-10'>
          {/* Book cover */}
          <img
            src={request.book.bookImg}
            alt={request.book.title}
            className='max-w-[200px] max-h-[350px] aspect-auto '
          />

          {/* Request detail */}
          <div className='w-2/3 space-y-5'>
            {/* book detail */}
            <div className='flex flex-col gap-1 text-primary'>
              <p className=' w-fit text-lg bg-primary text-white rounded-full px-8 py-1 mb-2'>
                Book
              </p>
              <div className='pl-4'>
                <h1 className='text-2xl font-bold'>{request.book.title}</h1>
                <p className='text-lg'>Author: {request.book.author}</p>
                <div className='flex gap-2 items-center'>
                  <span>Category: </span>

                  <p className='text-lg'>{request.book.category}</p>
                </div>
              </div>
            </div>

            {/* <div className='border-b-2 border-primary'></div> */}

            {/* Requester detail */}
            <div className='flex flex-col gap-1 text-primary'>
              <p className=' w-fit text-lg bg-primary text-white rounded-full px-8 py-1 mb-2'>
                Request
              </p>
              <div className='pl-4 '>
                <div className='grid grid-cols-3'>
                  <div>Name:</div>
                  <div className='text-lg font-bold col-span-2'>
                    {request.borrower.username}
                  </div>

                  <div>Email:</div>
                  <div className='text-lg font-bold col-span-2'>
                    {request.borrower.email}
                  </div>

                  <div>Duration:</div>
                  <div className='text-lg font-bold col-span-2'>
                    {request.requestDuration} days
                  </div>

                  <div>Request status:</div>
                  <div
                    className={`text-lg font-bold col-span-2 ${
                      request.isApproved && 'text-success'
                    } ${
                      request.status === 'Achieved' && !request.isApproved
                        ? 'text-danger'
                        : ''
                    }`}
                  >
                    {request.status}
                  </div>

                  <div>Request date:</div>
                  <div className='text-lg font-bold col-span-2'>
                    {request.dateOfRequest.toLocaleDateString()}
                  </div>

                  {request.dateOfAccepted && (
                    <>
                      <div>Approved date:</div>
                      <div className='text-lg font-bold col-span-2'>
                        {request.dateOfAccepted.toLocaleDateString()}
                      </div>
                    </>
                  )}

                  {request.dateOfReturn && (
                    <>
                      <div>To be Return on:</div>
                      <div className='text-lg font-bold col-span-2'>
                        {request.dateOfReturn.toLocaleDateString()}
                      </div>
                    </>
                  )}

                  {request.dateOfReturn && (
                    <>
                      <div>Returned date:</div>
                      <div className='text-lg font-bold col-span-2'>
                        {request.dateOfReturn.toLocaleDateString()}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
