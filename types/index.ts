export interface Book {
  bookId: string;
  title: string;
  author: string;
  genre: string;
  bookImage: string;
  description: string;
  maximumRequestPeriod: number;
}

export interface BookRequest {
  requestId: string;
  borrower: any;
  book: Book;
  status: 'Pending' | 'Approved' | 'Achieved';
  requestDuration: number;
  requestDate: Date;
}
