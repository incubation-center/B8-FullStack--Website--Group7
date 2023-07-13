import { HTMLAttributes } from 'react';

export default function BackArrowSvg({
  className
}: {
  className?: HTMLAttributes<HTMLElement>['className'];
}): JSX.Element {
  return (
    <svg
      className={className}
      width='19'
      height='32'
      viewBox='0 0 19 32'
      fill='inherit'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M18.4079 0.645466C18.017 0.244216 17.4806 0.0121804 16.916 0.000487023C16.3513 -0.0114952 15.8051 0.19804 15.3973 0.582629L0.655825 14.4876C0.236728 14.8827 0 15.4289 0 15.9999C0 16.571 0.236728 17.1172 0.655825 17.5123L15.3973 31.4172C15.9465 31.9353 16.7348 32.1256 17.4651 31.9166C18.1958 31.7074 18.7571 31.1311 18.9386 30.404C19.1198 29.6772 18.8932 28.9103 18.344 28.3925L11.7759 22.196L5.20773 15.9995L18.344 3.60659C18.7518 3.2223 18.9873 2.69424 18.9995 2.13867C19.0114 1.58312 18.7987 1.04571 18.4079 0.64471L18.4079 0.645466Z'
        fill='inherit'
      />
    </svg>
  );
}
