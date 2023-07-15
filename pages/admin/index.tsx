import { AdminTab } from '@/utils/enum';

export default function AdminHomePage() {
  return <div>Admin</div>;
}

export function getServerSideProps(context: any) {
  // redirect to the first tab

  const locale = context.locale;

  return {
    redirect: {
      destination: `/${locale}/admin/${AdminTab.DASHBOARD}`,
      permanent: false
    }
  };
}
