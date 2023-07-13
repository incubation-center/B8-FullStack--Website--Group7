import { HTMLAttributes } from 'react';

export default function SettingSvg({
  className
}: {
  className?: HTMLAttributes<HTMLElement>['className'];
}): JSX.Element {
  return (
    <svg
      className={className}
      width='25'
      height='25'
      viewBox='0 0 25 25'
      fill='inherit'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M21.25 6.625C21.25 6.5 21.125 6.375 21.125 6.25V6.125L22.5 4.75L20.25 2.5L18.875 3.875C18.875 3.875 18.875 3.875 18.75 3.875C18.625 3.875 18.5 3.75 18.375 3.75C17 2.75 16.25 2.125 13.75 2V0H11.25V2C8.75 2.25 7.875 2.875 6.625 3.75C6.5 3.75 6.375 3.875 6.375 3.875H6.25L4.75 2.5L2.5 4.75L3.875 6.125C3.875 6.125 3.875 6.125 3.875 6.25C3.875 6.375 3.75 6.625 3.75 6.625C2.875 8 2.25 8.75 2 11.25H0V13.75H2C2.25 16.25 2.875 17.125 3.75 18.375C3.75 18.5 3.875 18.625 3.875 18.625V18.75L2.5 20.25L4.75 22.5L6.125 21.125C6.125 21.125 6.125 21.125 6.25 21.125C6.375 21.25 6.625 21.25 6.625 21.25C8 22.125 8.75 22.75 11.25 23V25H13.75V23C16.25 22.75 17 22.125 18.375 21.25C18.5 21.125 18.625 21.125 18.75 21.125H18.875L20.25 22.5L22.5 20.25L21.125 18.875V18.75C21.125 18.625 21.25 18.5 21.25 18.5C22.25 17.125 22.875 16.375 23 13.875H25V11.375H23C22.75 8.75 22.25 8 21.25 6.625ZM19.875 14C19.875 14.125 19.875 14.125 19.875 14.25C19.75 14.625 19.625 15.125 19.5 15.5C19.5 15.5 19.5 15.5 19.5 15.625C18.75 17.375 17.375 18.75 15.625 19.5H15.5C15.125 19.625 14.75 19.75 14.375 19.875C14.25 19.875 14.25 19.875 14.125 20C13.5 20 13 20 12.5 20C12 20 11.5 20 11 19.875C10.875 19.875 10.875 19.875 10.75 19.75C10.375 19.625 10 19.5 9.625 19.375H9.5C7.75 18.625 6.375 17.25 5.625 15.5C5.5 15.125 5.375 14.75 5.25 14.25C5.25 14.125 5.25 14.125 5.25 14C5 13.5 5 13 5 12.5C5 12 5 11.5 5.125 11C5.125 10.875 5.125 10.875 5.125 10.75C5.25 10.375 5.375 9.875 5.5 9.5C6.25 7.75 7.625 6.375 9.375 5.625C9.375 5.625 9.375 5.625 9.5 5.625C9.875 5.5 10.25 5.375 10.75 5.25C10.875 5.25 10.875 5.25 11 5.25C11.5 5 12 5 12.5 5C13 5 13.5 5 14 5.125C14.125 5.125 14.125 5.125 14.25 5.125C14.625 5.25 15.125 5.375 15.5 5.5C15.5 5.5 15.5 5.5 15.625 5.5C17.375 6.25 18.75 7.625 19.5 9.375C19.5 9.375 19.5 9.375 19.5 9.5C19.625 9.875 19.75 10.25 19.875 10.75C19.875 10.875 19.875 10.875 19.875 11C20 11.5 20 12 20 12.5C20 13 20 13.5 19.875 14Z'
        fill='inherit'
      />
    </svg>
  );
}
