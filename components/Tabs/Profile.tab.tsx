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
      
      <div className='relative justify-start w-full lg:w-3/5 mx-auto mt-10'>
        <h1 className='font-extrabold text-primary text-start text-xl md:text-3xl'
          >Personal Information</h1>
        <div className='w-full mt-5 h-[300px] justify-center bg-[#EBEBEB] rounded-xl'>
          <button className='bg-secondary text-white font-light rounded-lg py-1 px-7 mt-7 absolute right-8 transition-colors box-border border-2 border-alt-secondary hover:border-action'>
            Edit
          </button>
          <div className='ml-16 text-primary text-start text-lg md:text-2xl md:space-y-5
              '>
            <h5 className='pt-10 font-extrabold'>
              Username
            </h5>
            <h5>
              Kanhchana Kao
            </h5>
          </div>
          <div className=' text-primary text-lg absolute left-2/4 md:text-2xl md:space-y-5 '>
              <h5 className='pt-7 font-extrabold'>
                Phone Number
              </h5>
              <h5>
                +855 12345678
              </h5>
          </div>
          <div className='ml-16 text-primary text-start text-lg md:text-2xl md:space-y-5'>
            <h5 className='pt-6 font-extrabold'>
              Email
            </h5>
            <h5>
              kanhchana19@kit.edu.kh
            </h5>
          </div>
        </div>
      </div>
      <div className='mt-5 relative justify-start w-full lg:w-3/5 mx-auto'>
        <h1 className='font-extrabold text-primary text-start text-xl md:text-3xl'
          >Privacy Setting</h1>
        <div className='w-full mt-5 h-[90px] justify-center bg-[#EBEBEB] rounded-xl'>
          <button className='bg-secondary text-white font-light rounded-lg py-1 px-7 mt-7 absolute right-8 transition-colors box-border border-2 border-alt-secondary hover:border-action'>
            Edit
          </button>
          <h5 className='
            font-extrabold ml-16 pt-6 text-primary text-start text-lg md:text-2xl md:space-y-5 '>
              Password
            </h5>
        </div>
      </div>
    </div>
  );
}