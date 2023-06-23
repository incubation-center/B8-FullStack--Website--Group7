import { AdminTab } from '@/utils/enum';

export default function AdminHomePage() {
  return <div>Admin</div>;
}

export function getServerSideProps(context: any) {
  // redirect to the first tab

  return {
    redirect: {
      destination: `/admin/${AdminTab.DASHBOARD}`,
      permanent: false
    }
  };
}
