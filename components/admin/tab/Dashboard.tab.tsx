import Image from 'next/image';

import AdminTabLayout from '@/components/layout/AdminTabLayout';
import { AdminTab } from '@/utils/enum';
import { formatEnumValue } from '@/utils/function';

export default function DashboardTab({}) {
  return (
    <AdminTabLayout title={formatEnumValue(AdminTab.DASHBOARD)}>
      {/* Request Data */}
      <div
        className='
          w-full h-full
          gap-4
          grid grid-cols-2 xl:grid-cols-4  
        '
      >
        <RequestDataShow
          title='Total Incoming'
          icon='/icon/admin-sidebar/incoming-admin.svg'
          value={{
            total: 52,
            today: 11,
            yesterday: 19
          }}
        />

        <RequestDataShow
          title='Total Active'
          icon='/icon/admin-sidebar/active-admin.svg'
          value={{
            total: 52,
            today: 11,
            yesterday: 19
          }}
        />

        <RequestDataShow
          title='Total Approved'
          icon='/icon/admin-sidebar/active-admin.svg'
          value={{
            total: 52,
            today: 11,
            yesterday: 19
          }}
        />

        <RequestDataShow
          title='Total Archived'
          icon='/icon/admin-sidebar/archived-admin.svg'
          value={{
            total: 52,
            today: 11,
            yesterday: 19
          }}
        />
      </div>
    </AdminTabLayout>
  );
}

const RequestDataShow = ({
  title,
  icon,
  value
}: {
  title: string;
  icon: string;
  value: {
    total: number;
    today: number;
    yesterday: number;
  };
}) => {
  return (
    <div className='rounded-lg bg-alt-secondary p-4 lg:px-8 min-w-[20 0px] lg:min-w-[250px] h-fit'>
      <h1 className='text-lg text-primary font-bold'>{title}</h1>
      <div className='flex h-full items-center justify-between py-4 mb-2 border-b-2'>
        <h1 className='text-4xl text-primary font-extrabold'>{value.total}</h1>
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt={title} className='h-6' />
      </div>
      <div className='flex justify-between text-primary'>
        <div>Today {value.today}</div>
        <div>Yesterday {value.yesterday}</div>
      </div>
    </div>
  );
};
