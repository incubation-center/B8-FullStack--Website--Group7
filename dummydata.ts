import { Book, BookRequest } from './types';

const BookData: Book[] = [
  {
    bookId: '1',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    bookImage:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    bookId: '2',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    bookImage:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    bookId: '3',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    bookImage:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    bookId: '4',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    bookImage:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    bookId: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    bookImage:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    bookId: '6',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    bookImage:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    bookId: '7',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    bookImage:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    bookId: '8',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    bookImage:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    bookId: '9',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    bookImage:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    bookId: '10',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    bookImage:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  },
  {
    bookId: '11',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    bookImage:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-fn9CGygsbOL481n9R6Zm7EHIH7ivZX3p7_ldUArstsRsFn_W',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in childrens literature.',
    maximumRequestPeriod: 14
  }
];

const RequestData: BookRequest[] = [
  {
    requestId: '1',
    borrower: 'borrower id',
    book: BookData[0],
    status: 'Pending',
    requestDuration: 14,
    requestDate: new Date()
  },
  {
    requestId: '2',
    borrower: 'borrower id',
    book: BookData[1],
    status: 'Pending',
    requestDuration: 14,
    requestDate: new Date()
  },
  {
    requestId: '3',
    borrower: 'borrower id',
    book: BookData[2],
    status: 'Approved',
    requestDuration: 14,
    requestDate: new Date()
  },
  {
    requestId: '4',
    borrower: 'borrower id',
    book: BookData[3],
    status: 'Approved',
    requestDuration: 14,
    requestDate: new Date()
  },
  {
    requestId: '5',
    borrower: 'borrower id',
    book: BookData[4],
    status: 'Approved',
    requestDuration: 14,
    requestDate: new Date()
  },
  {
    requestId: '6',
    borrower: 'borrower id',
    book: BookData[5],
    status: 'Achieved',
    requestDuration: 14,
    requestDate: new Date()
  },
  {
    requestId: '7',
    borrower: 'borrower id',
    book: BookData[6],
    status: 'Achieved',
    requestDuration: 14,
    requestDate: new Date()
  }
];

export { BookData, RequestData };
