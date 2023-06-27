import { AuthAtom } from '@/service/recoil';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';

export default function NotLoggedInLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const authStore = useRecoilValue(AuthAtom);

  if (authStore.isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center p-4 text-center'>
      <div
        className='
        text-primary text-lg font-medium
        '
      >
        You are not logged in
      </div>

      <Link
        className='
            bg-primary text-white px-4 py-2 rounded-full w-40
            text-lg font-medium mt-4
          '
        href={'/auth'}
      >
        Login
      </Link>
    </div>
  );
}
