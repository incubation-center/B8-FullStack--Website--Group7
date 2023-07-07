import { HTMLAttributes } from 'react';

export default function SavedSvg({
  className
}: {
  className?: HTMLAttributes<HTMLElement>['className'];
}): JSX.Element {
  return (
    <svg
      className={className}
      width='19'
      height='22'
      viewBox='0 0 19 22'
      fill='inherit'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.90551 22C3.81592 22 4.68676 21.5679 5.225 20.8449L8.86667 16.0287C9.15966 15.6358 9.83259 15.6358 10.1333 16.0287L13.775 20.8449C14.3212 21.5679 15.192 22 16.0945 22C17.6938 22 19 20.7115 19 19.1163V4.71431C19 2.11354 16.8705 0 14.25 0H4.75C2.12954 0 0 2.11354 0 4.71431V19.1163C0 20.7114 1.29829 22 2.90551 22ZM1.58333 4.71418C1.58333 2.9777 3.00037 1.5713 4.75 1.5713H14.25C15.9996 1.5713 17.4167 2.9777 17.4167 4.71418V19.1162C17.4167 19.8391 16.8229 20.4284 16.0945 20.4284C15.6828 20.4284 15.2869 20.232 15.0417 19.9019L11.4 15.0857C10.9566 14.4964 10.2441 14.1428 9.5 14.1428C8.75588 14.1428 8.04338 14.4964 7.6 15.0857L3.95833 19.9019C3.71288 20.232 3.31704 20.4284 2.90551 20.4284C2.17708 20.4284 1.58333 19.8391 1.58333 19.1162V4.71418Z'
        fill='inherit'
      />
    </svg>
  );
}