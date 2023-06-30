import { Book, BookRequest, User } from './types';

const BookData: Book[] = [
  {
    id: '1',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    bookImg:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    id: '2',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    bookImg:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    id: '3',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    bookImg:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    id: '4',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    bookImg:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    bookImg:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    id: '6',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    bookImg:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    id: '7',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    bookImg:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    id: '8',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    bookImg:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    id: '9',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    bookImg:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    id: '10',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    bookImg:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    id: '11',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    bookImg:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
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
    status: 'PENDING',
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
    status: 'PENDING',
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
    status: 'APPROVED',
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
    status: 'APPROVED',
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
    status: 'APPROVED',
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
    status: 'ACHIEVED',
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
    status: 'ACHIEVED',
    requestDuration: 14,
    dateOfRequest: new Date(),
    isApproved: false,
    dateOfAccepted: new Date(),
    dateOfReturn: new Date(),
    dateOfReceived: new Date()
  }
];

export { BookData, RequestData, SampleUser };
