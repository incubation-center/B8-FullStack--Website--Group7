import { HTMLAttributes } from 'react';

export default function BusinessSvg({
  className
}: {
  className?: HTMLAttributes<HTMLElement>['className'];
}): JSX.Element {
  return (
    <svg className={className} width="22" height="19" viewBox="0 0 22 19" fill="inherit" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.8456 3.44752H15.2418C15.069 2.05137 13.8213 1 12.2574 1L9.54706 1.00015C7.93635 1.00015 6.7 2.03491 6.56127 3.44767H5.15456C4.04452 3.44767 3.0027 3.86631 2.22194 4.62577C1.43405 5.38522 1 6.3917 1 7.45906V14.9687C1 16.6403 2.4075 18 4.13817 18H17.862C19.5925 18.0001 21 16.6402 21 14.9687V7.45906C21 5.24697 19.1362 3.44752 16.8456 3.44752L16.8456 3.44752ZM9.54714 1.66498H12.2573C13.4536 1.66498 14.3807 2.41158 14.5458 3.44752H14.0668C13.9335 2.65386 13.2279 2.12012 12.2572 2.12012H9.54714C8.60452 2.12012 7.89131 2.6624 7.73956 3.44752H7.25564C7.38956 2.40037 8.31095 1.66498 9.54714 1.66498ZM13.3627 3.44752H8.4496C8.60477 2.99494 9.0898 2.78495 9.54722 2.78495H12.2574C12.7073 2.78495 13.2207 2.96506 13.3627 3.44752ZM2.71032 5.09465C3.36183 4.4612 4.23004 4.11235 5.15452 4.11235H16.8454C18.756 4.11235 20.3105 5.61373 20.3105 7.45891C20.3105 8.3508 19.9485 9.18796 19.2907 9.81675C18.6331 10.4508 17.7644 10.8001 16.8353 10.8001L13.3219 10.8993C13.2549 9.93826 12.425 9.17567 11.4117 9.17567H10.3929C9.43607 9.17567 8.64333 9.85619 8.50135 10.7412L5.15468 10.8004C3.24405 10.8004 1.6896 9.30152 1.6896 7.45921C1.6896 6.56928 2.05186 5.72974 2.71036 5.09464L2.71032 5.09465ZM9.16587 11.024C9.16587 10.3715 9.71631 9.84078 10.3928 9.84078H11.4115C12.0881 9.84078 12.6386 10.3715 12.6386 11.024V11.2419C12.6386 11.8943 12.0881 12.4251 11.4115 12.4251H10.3928C9.71631 12.4251 9.16587 11.8943 9.16587 11.2419V11.024ZM20.3103 14.9689C20.3103 16.2739 19.2119 17.3354 17.8616 17.3354H4.13782C2.78782 17.3354 1.68913 16.2739 1.68913 14.9689V9.66331C2.43397 10.7475 3.71032 11.465 5.16044 11.465L8.48464 11.4065C8.5716 12.3485 9.39329 13.0898 10.3923 13.0898H11.4111C12.3531 13.0898 13.1368 12.4306 13.2965 11.5654L16.8451 11.465C17.9485 11.465 18.99 11.0464 19.7768 10.2879C19.9783 10.0952 20.1561 9.88569 20.3102 9.6633L20.3103 14.9689Z" fill="inherit" stroke="#523A28" stroke-width="0.5"/>
    </svg>
  );
}
