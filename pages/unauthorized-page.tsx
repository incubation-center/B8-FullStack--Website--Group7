import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function UnauthorizedPage() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className='
            flex flex-col items-center justify-center
            w-full h-screen
        '
    >
      <h1
        className='
                text-4xl text-primary font-bold
            '
      >
        401
      </h1>
      <h2
        className='
                text-2xl text-primary font-bold
            '
      >
        Unauthorized
      </h2>

      <p
        className='
                text-primary text-lg font-medium
            '
      >
        You are not authorized to access this page
      </p>

      <button
        className='
            bg-primary text-white px-4 py-2 rounded-full
            text-lg font-medium mt-4
          '
        onClick={() => router.replace('/')}
      >
        Go back to home
      </button>
    </div>
  );
}
