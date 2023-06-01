import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className='h-full w-full flex justify-center items-center space-x-4'>
      <Image
        src='/icon/app-icon.png'
        alt='bookshelf'
        width={100}
        height={100}
      />
      <span>Public Library</span>
    </div>
  );
}
