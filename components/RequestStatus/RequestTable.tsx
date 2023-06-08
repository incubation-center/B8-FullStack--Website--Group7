import { BookRequest } from '@/types';

export default function RequestTable({ data }: { data: BookRequest[] }) {
  return (
    <table
      className='
        w-full lg:w-4/5 mx-auto
        mb-4 md:mb-8 
        mt-2 md:mt-4 
      '
    >
      <thead>
        <tr
          className='
          text-primary font-extrabold text-base border-b-2 border-primary
          '
        >
          <td>No</td>
          <td>Book Name</td>
          <td>Request Date</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody>
        {data.map((request, index) => (
          <tr
            key={index}
            className='
              text-primary font-light text-base
              border-b-2 border-primary
              [&>*]:pt-4
            '
          >
            <td>{index + 1}</td>
            <td>{request.book.title}</td>
            <td>{request.requestDate.toLocaleDateString()}</td>
            <td>{request.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
