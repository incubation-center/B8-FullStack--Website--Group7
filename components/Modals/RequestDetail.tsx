/* eslint-disable @next/next/no-img-element */
import { BookRequest } from '@/types';
import StatusLabel from '../RequestStatus/StatusLabel';
import { useTranslation } from 'next-i18next';

export default function RequestDetail({
  request,
}: {
  request: BookRequest | null;
}) {
  const { t } = useTranslation('common');

  return (
    <div className='w-full max-h-[80vh] flex flex-col gap-4 p-[30px] bg-alt-secondary rounded-xl '>
      {/* show loading if request null  */}
      {request && (
        <div className='w-fit flex flex-wrap gap-5 overflow-y-auto overflow-x-hidden '>
          {/* Book cover */}

          <img
            src={request.book.bookImg}
            alt={request.book.title}
            className='
              max-w-[150px] md:max-w-[200px]
              max-h-[200px] md:max-h-[400px] 
              aspect-auto object-scale-down object-top mx-auto
            '
          />

          {/* Request detail */}
          <div className='w-fit space-y-5'>
            {/* book detail */}
            <div className='flex flex-col gap-1 text-primary'>
              <p className=' w-fit text-lg bg-primary text-white rounded-full px-8 py-1 mb-2'>
                {t('request-detail.book.label', 'Book ')}
              </p>
              <div className='pl-4'>
                <h1 className='text-lg  font-bold'>{request.book.title}</h1>
                <p className=''>
                  {t('request-detail.book.author', 'Author')}:{' '}
                  {request.book.author}
                </p>
                <div className='flex gap-2 items-center'>
                  <span>{t('request-detail.book.category', 'Category')}: </span>

                  <p className=''>{request.book.category}</p>
                </div>
              </div>
            </div>

            {/* <div className='border-b-2 border-primary'></div> */}

            {/* Requester detail */}
            <div className='flex flex-col gap-1 text-primary'>
              <p className=' w-fit text-lg bg-primary text-white rounded-full px-8 py-1 mb-2'>
                {t('request-detail.request.label', 'Request')}
              </p>
              <div className='pl-4 '>
                <div className='md:grid grid-cols-3 gap-x-2 gap-y-1 items-center'>
                  <div>{t('request-detail.request.name', 'Name')}:</div>
                  <div className=' font-bold col-span-3 md:col-span-2'>
                    {request.borrower.username}
                  </div>

                  <div>{t('request-detail.request.email', 'Email')}: :</div>
                  <div className=' font-bold col-span-3 md:col-span-2'>
                    {request.borrower.email}
                  </div>

                  <div>
                    {t('request-detail.request.phone-number', 'Phone number')}:
                  </div>
                  <div className=' font-bold col-span-3 md:col-span-2'>
                    {request.borrower.phoneNumber}
                  </div>

                  <div>
                    {t('request-detail.request.duration', 'Request duration')}:
                  </div>
                  <div className=' font-bold col-span-3 md:col-span-2'>
                    {request.requestDuration} days
                  </div>

                  <div>
                    {t(
                      'request-detail.request.request-status',
                      'Request status'
                    )}
                    :
                  </div>
                  <div className='w-full col-span-3 md:col-span-2'>
                    <StatusLabel request={request} />
                  </div>

                  <div>
                    {t('request-detail.request.request-date', 'Request date')}:
                  </div>
                  <div className=' font-bold col-span-3 md:col-span-2'>
                    {request.dateOfRequest.toLocaleDateString()}
                  </div>

                  {request.dateOfAccepted && (
                    <>
                      <div>
                        {t('request-detail.request.approved-date', 'Accepted')}:
                      </div>
                      <div className=' font-bold col-span-3 md:col-span-2'>
                        {request.dateOfAccepted.toLocaleDateString()}
                      </div>
                    </>
                  )}

                  {request.dateOfReturn && (
                    <>
                      <div>
                        {t(
                          'request-detail.request.to-be-returned-on',
                          'To be returned on'
                        )}
                        :
                      </div>
                      <div className=' font-bold col-span-3 md:col-span-2'>
                        {request.dateOfReturn.toLocaleDateString()}
                      </div>
                    </>
                  )}

                  {request.dateOfReceived && (
                    <>
                      <div>
                        {t(
                          'request-detail.request.returned-date',
                          'Returned date'
                        )}
                        :
                      </div>
                      <div className=' font-bold col-span-3 md:col-span-2'>
                        {request.dateOfReceived.toLocaleDateString()}
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
