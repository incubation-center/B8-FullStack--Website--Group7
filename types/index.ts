export interface Book {
  id?: string;
  author: string;
  category: string;
  bookImg: string;
  description: string;
  title: string;
  maximumRequestPeriod: number;
}

export interface User {
  userId?: string;
  username: string;
  email: string;
  phoneNumber: string;
  profileImg: string;
  role: 'ADMIN' | 'USER';
  favoriteBooks: Book[];
}

export interface BookRequest {
  requestId: string;
  borrower: User;
  book: Book;
  status: RequestStatus;
  isApproved: boolean;
  requestDuration: number;
  dateOfRequest: Date;
  dateOfAccepted?: Date | null;
  dateOfReturn?: Date | null;
  dateOfReceived?: Date | null;
}

export enum RequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  ACHIEVED = 'ARCHIVED'
}
