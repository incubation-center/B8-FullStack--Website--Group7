

import Image from 'next/image';
export default function ProfileTab() {
  return (
    <div className='w-full h-full overflow-y-scroll'>
      <div className="w-[170px] h-[170px] mt-10 relative justify-center items-center overflow-hidden rounded-full mx-auto">
        <Image
          src='/asset/library.png'
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>
      <div className='relative justify-start w-full lg:w-4/5 mx-auto mt-10'>
        <h1 className='
            font-extrabold 
            text-primary 
            text-start
            text-xl 
            md:text-3xl'
          >Personal Information</h1>
        <div className='w-full mt-5 h-[300px] justify-center bg-[#EBEBEB] rounded-xl'>
          <button className='
          bg-secondary 
          text-white 
            font-light
            rounded-lg py-1 px-7 mt-7 absolute right-8 transition-colors
              box-border border-2 border-alt-secondary hover:border-action'
            >
            Edit
          </button>
        </div>
      </div>
      <div className='mt-5 relative justify-start w-full lg:w-4/5 mx-auto'>
        <h1 className='
            font-extrabold 
            text-primary 
            text-start
            text-xl 
            md:text-3xl'
          >Privacy Setting</h1>
        <div className='w-full mt-5 h-[90px] justify-center bg-[#EBEBEB] rounded-xl'>
          <button className='
          bg-secondary 
          text-white 
            font-light
            rounded-lg py-1 px-7 mt-7 absolute right-8 transition-colors
              box-border border-2 border-alt-secondary hover:border-action'
            >
            Edit
          </button>
        
        </div>
      </div>
    </div>
  );
}