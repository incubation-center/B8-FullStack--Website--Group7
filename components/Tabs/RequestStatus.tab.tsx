// import DataTable from 'react-data-table-component';
// convert above to dynamic import

import { RequestData } from '@/dummydata';
import { BookRequest } from '@/types';
import RequestTable from '../RequestStatus/RequestTable';

export default function RequestStatusTab() {
  return (
    <div className='w-full h-full overflow-y-scroll'>
      <h1
        className='
          font-extrabold text-primary text-center
          text-2xl md:text-4xl
          pb-4 md:pb-8 
          pt-2 md:pt-4 
        '
      >
        Request Status
      </h1>

      {/* table */}
      <RequestTable data={RequestData} />
    </div>
  );
}
