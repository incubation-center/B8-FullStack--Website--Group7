import { Book, BookRequest, BookReview, RequestStatus, User } from './types';

const BookData: Book[] = [
  {
    id: '1',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    bookImg:
      'https://firebasestorage.googleapis.com/v0/b/kjeybook-81ae5.appspot.com/o/business%2F1.jpeg?alt=media&token=4fbfaa96-edb7-4fcf-88fe-38182c3624a5',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14,
    overAllRating: 4.5,
    reviewsCount: 100
  },
  {
    id: '2',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Education',
    bookImg:
      'https://firebasestorage.googleapis.com/v0/b/kjeybook-81ae5.appspot.com/o/business%2F1.jpeg?alt=media&token=4fbfaa96-edb7-4fcf-88fe-38182c3624a5',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14,
    overAllRating: 4.5,
    reviewsCount: 100
  },
  {
    id: '3',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Business',
    bookImg:
      'https://firebasestorage.googleapis.com/v0/b/kjeybook-81ae5.appspot.com/o/business%2F1.jpeg?alt=media&token=4fbfaa96-edb7-4fcf-88fe-38182c3624a5',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14,
    overAllRating: 4.5,
    reviewsCount: 100
  },
  {
    id: '4',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Drama',
    bookImg:
      'https://firebasestorage.googleapis.com/v0/b/kjeybook-81ae5.appspot.com/o/business%2F1.jpeg?alt=media&token=4fbfaa96-edb7-4fcf-88fe-38182c3624a5',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14,
    overAllRating: 4.5,
    reviewsCount: 100
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'History',
    bookImg:
      'https://firebasestorage.googleapis.com/v0/b/kjeybook-81ae5.appspot.com/o/business%2F1.jpeg?alt=media&token=4fbfaa96-edb7-4fcf-88fe-38182c3624a5',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14,
    overAllRating: 4.5,
    reviewsCount: 100
  },
  {
    id: '6',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    bookImg:
      'https://firebasestorage.googleapis.com/v0/b/kjeybook-81ae5.appspot.com/o/business%2F1.jpeg?alt=media&token=4fbfaa96-edb7-4fcf-88fe-38182c3624a5',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14,
    overAllRating: 4.5,
    reviewsCount: 100
  },
  {
    id: '7',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    bookImg:
      'https://firebasestorage.googleapis.com/v0/b/kjeybook-81ae5.appspot.com/o/business%2F1.jpeg?alt=media&token=4fbfaa96-edb7-4fcf-88fe-38182c3624a5',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14,
    overAllRating: 4.5,
    reviewsCount: 100
  },
  {
    id: '8',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    bookImg:
      'https://firebasestorage.googleapis.com/v0/b/kjeybook-81ae5.appspot.com/o/business%2F1.jpeg?alt=media&token=4fbfaa96-edb7-4fcf-88fe-38182c3624a5',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14,
    overAllRating: 4.5,
    reviewsCount: 100
  },
  {
    id: '9',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Self Development',
    bookImg:
      'https://firebasestorage.googleapis.com/v0/b/kjeybook-81ae5.appspot.com/o/business%2F1.jpeg?alt=media&token=4fbfaa96-edb7-4fcf-88fe-38182c3624a5',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14,
    overAllRating: 4.5,
    reviewsCount: 100
  },
  {
    id: '10',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    bookImg:
      'https://firebasestorage.googleapis.com/v0/b/kjeybook-81ae5.appspot.com/o/business%2F1.jpeg?alt=media&token=4fbfaa96-edb7-4fcf-88fe-38182c3624a5',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14,
    overAllRating: 4.5,
    reviewsCount: 100
  },
  {
    id: '11',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    bookImg:
      'https://firebasestorage.googleapis.com/v0/b/kjeybook-81ae5.appspot.com/o/business%2F1.jpeg?alt=media&token=4fbfaa96-edb7-4fcf-88fe-38182c3624a5',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14,
    overAllRating: 4.5,
    reviewsCount: 100
  }
];

const SampleUser: User = {
  userId: '1',
  email: 'nel.sokchhunly19@kit.edu.kh',
  favoriteBooks: [],
  phoneNumber: '0123456789',
  profileImg:
    'https://i.pinimg.com/736x/a0/25/04/a025049f3035cf3db789cc4cba5dd29e.jpg',
  role: 'USER',
  username: 'Nel Sokchhunly'
};

const RequestData: BookRequest[] = [
  {
    requestId: '1',
    borrower: SampleUser,
    book: BookData[0],
    status: RequestStatus.PENDING,
    requestDuration: 14,
    dateOfRequest: new Date(),
    isApproved: false,
    dateOfAccepted: null,
    dateOfReturn: null,
    dateOfReceived: null
  },
  {
    requestId: '2',
    borrower: SampleUser,
    book: BookData[1],
    status: RequestStatus.PENDING,
    requestDuration: 14,
    dateOfRequest: new Date(),
    isApproved: false,
    dateOfAccepted: null,
    dateOfReturn: null,
    dateOfReceived: null
  },
  {
    requestId: '3',
    borrower: SampleUser,
    book: BookData[2],
    status: RequestStatus.ACCEPTED,
    requestDuration: 14,
    dateOfRequest: new Date(),
    isApproved: false,
    dateOfAccepted: null,
    dateOfReturn: new Date(),
    dateOfReceived: null
  },
  {
    requestId: '4',
    borrower: SampleUser,
    book: BookData[3],
    status: RequestStatus.ACCEPTED,
    requestDuration: 14,
    dateOfRequest: new Date(),
    isApproved: false,
    dateOfAccepted: null,
    dateOfReturn: new Date(),
    dateOfReceived: null
  },
  {
    requestId: '5',
    borrower: SampleUser,
    book: BookData[4],
    status: RequestStatus.ACCEPTED,
    requestDuration: 14,
    dateOfRequest: new Date(),
    isApproved: false,
    dateOfAccepted: null,
    dateOfReturn: new Date(),
    dateOfReceived: null
  },
  {
    requestId: '6',
    borrower: SampleUser,
    book: BookData[5],
    status: RequestStatus.ACHIEVED,
    requestDuration: 14,
    dateOfRequest: new Date(),
    isApproved: true,
    dateOfAccepted: new Date(),
    dateOfReturn: new Date(),
    dateOfReceived: new Date()
  },
  {
    requestId: '7',
    borrower: SampleUser,
    book: BookData[6],
    status: RequestStatus.ACHIEVED,
    requestDuration: 14,
    dateOfRequest: new Date(),
    isApproved: false,
    dateOfAccepted: new Date(),
    dateOfReturn: new Date(),
    dateOfReceived: new Date()
  }
];

export { BookData, RequestData, SampleUser };
