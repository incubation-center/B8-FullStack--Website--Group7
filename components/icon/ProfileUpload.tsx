import { HTMLAttributes } from 'react';

export default function ProfileUploadSvg({
  className
}: {
  className?: HTMLAttributes<HTMLElement>['className'];
}): JSX.Element {
  return (
    <svg className={className} width="18" height="16" viewBox="0 0 18 16" fill="inherit" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3241 3.05641C13.2531 2.27112 12.92 1.53249 12.3781 0.959504C10.9494 -0.156423 7.01135 -0.156423 5.58162 0.959504H5.58175C5.0401 1.53262 4.70711 2.27116 4.63612 3.05641C3.63922 3.18178 2.36617 3.43682 1.85883 3.94412C0.56986 5.23269 0.469727 8.0433 0.469727 8.87388C0.469727 9.70499 0.569844 12.5155 1.85883 13.804C2.7239 14.6695 5.85191 15.102 8.97993 15.102C12.1078 15.1016 15.236 14.6691 16.101 13.804C17.39 12.5155 17.4901 9.70512 17.4901 8.87388C17.4901 8.04314 17.39 5.23259 16.101 3.94412C15.5941 3.43665 14.3207 3.18178 13.3237 3.05628L13.3241 3.05641ZM15.0075 12.71C13.8243 13.8932 4.13602 13.8924 2.95298 12.71C2.39306 12.1502 2.01719 10.609 2.01719 8.87378C2.01719 7.13915 2.39306 5.59785 2.93899 5.0508C3.72464 4.74604 4.55449 4.57042 5.39634 4.53103C5.57832 4.51471 5.74863 4.43454 5.87725 4.30476C6.00586 4.17485 6.08435 4.00376 6.09899 3.82153C6.11815 3.24815 6.26697 2.68644 6.53417 2.17871C7.28835 1.78782 8.13568 1.61179 8.9831 1.66982C9.82704 1.61179 10.6707 1.78677 11.422 2.17559C11.6915 2.68422 11.8417 3.24722 11.8617 3.82229C11.8764 4.00427 11.9551 4.17525 12.0835 4.30489C12.212 4.43454 12.3822 4.51458 12.5639 4.53103C13.3994 4.57468 14.2235 4.74565 15.0073 5.03797C15.5672 5.59789 15.9431 7.13915 15.9431 8.87388C15.9431 10.6089 15.5672 12.1502 15.0073 12.7101L15.0075 12.71Z" fill="inherit"/>
    <path d="M8.98049 5.07959C8.05714 5.07959 7.17162 5.44637 6.51873 6.0993C5.86584 6.75222 5.49902 7.63771 5.49902 8.56106C5.49902 9.48441 5.8658 10.3699 6.51873 11.0228C7.17165 11.6757 8.05714 12.0425 8.98049 12.0425C9.90385 12.0425 10.7894 11.6757 11.4423 11.0228C12.0951 10.3699 12.462 9.48441 12.462 8.56106C12.4609 7.63797 12.0939 6.75312 11.4411 6.10046C10.7884 5.44766 9.90358 5.08062 8.98049 5.07959ZM8.98049 10.4951C8.46746 10.4951 7.97554 10.2914 7.61291 9.92858C7.25014 9.56591 7.04639 9.07403 7.04639 8.56099C7.04639 8.04796 7.25012 7.55604 7.61291 7.19341C7.97558 6.83064 8.46746 6.62689 8.98049 6.62689C9.49353 6.62689 9.98544 6.83062 10.3481 7.19341C10.7109 7.55608 10.9146 8.04796 10.9146 8.56099C10.9141 9.07376 10.7101 9.56541 10.3475 9.92795C9.98491 10.2906 9.49326 10.4946 8.98049 10.4951Z" fill="inherit"/>
    </svg>

  );
}