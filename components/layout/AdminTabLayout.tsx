export default function AdminTabLayout({
  children,
  title
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className='p-4 md:p-8 min-h-full w-full'>
      <h1 className='text-2xl text-primary font-extrabold mb-4'>{title}</h1>
      <div>{children}</div>
    </div>
  );
}
