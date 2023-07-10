import { BookRequest, RequestStatus } from '@/types';
import { useLocale } from '@/utils/function';
import { useTranslation } from 'next-i18next';

export default function StatusLabel({ request }: { request: BookRequest }) {
  const { t } = useTranslation('common');

  const { isKhmer } = useLocale();

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
          {t('request-status.pending', 'Pending')}
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
          {t('request-status.active', 'Active')}
        </div>
      )}
      {request.status === RequestStatus.ACHIEVED && (
        <div
          className={`
            rounded-full 
            px-2 py-1 text-xs 
            md:text-sm md:px-4 md:py-2
            ${isKhmer ? 'font-medium' : 'font-bold'}
             text-white w-28
            ${request.isApproved ? 'bg-primary' : 'bg-danger'}
          `}
        >
          {request.isApproved
            ? t('request-status.approved', 'Accepted')
            : t('request-status.rejected', 'Rejected')}
        </div>
      )}
    </div>
  );
}
