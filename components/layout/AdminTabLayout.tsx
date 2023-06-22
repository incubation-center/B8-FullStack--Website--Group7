export default function AdminTabLayout({
  children,
  title
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className='p-4 md:p-8 min-h-full w-full overflow-y-scroll flex flex-grow flex-col'>
      <h1 className='text-2xl text-primary font-bold mb-4'>{title}</h1>
      <div className='w-full flex-1'>{children}</div>
    </div>
  );
}
