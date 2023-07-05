import LinkExpiredSvg from '@/components/icon/LinkExpiredSvg';
import Link from 'next/link';

export default function LinkExpired() {
  return (
    <div
      className='
        bg-primary text-alt-secondary 
        w-full h-full flex flex-col justify-center items-center space-y-8
        text-center
      '
    >
      <div>
        <LinkExpiredSvg className='w-20 h-20 stroke-alt-secondary' />
        <h1>Link Expired</h1>
      </div>
      <p>
        The link you used to reset your password has expired.
        <br />
        Please request a new link from the forgot password page.
      </p>
      <div>
        <Link href='/forgot-password'>
          <span className='bg-alt-secondary px-4 py-2 rounded-full text-primary font-medium'>
            Back to Forgot password
          </span>
        </Link>
      </div>
    </div>
  );
}
