import { HTMLAttributes } from 'react';

export default function HomeSvg({
  className
}: {
  className?: HTMLAttributes<HTMLElement>['className'];
}): JSX.Element {
  return (
    <svg
      className={className}
      width='21'
      height='22'
      viewBox='0 0 21 22'
      fill='inherit'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.73529 22C7.33464 22 7.90907 21.7633 8.33228 21.3418C8.75615 20.9209 8.99414 20.3496 8.99414 19.7536V16.0095C8.99414 15.5962 9.33145 15.2607 9.74709 15.2607H11.253C11.6686 15.2607 12.0059 15.5962 12.0059 16.0095V19.7536C12.0059 20.3496 12.2439 20.9209 12.6678 21.3418C13.091 21.7633 13.6655 22 14.2648 22H18.1154C19.3118 22 20.3005 21.073 20.3704 19.8853L20.9961 9.31299C21.0377 8.60698 20.7424 7.92321 20.2003 7.46656L11.9592 0.53176C11.1166 -0.177253 9.88335 -0.177253 9.04082 0.53176L0.799665 7.46656C0.257626 7.92321 -0.0376597 8.60698 0.00386014 9.31299L0.629584 19.8853C0.699501 21.073 1.68823 22 2.88457 22H6.73529ZM6.73529 20.5024H2.88465C2.48566 20.5024 2.15657 20.1932 2.13321 19.7977L1.50748 9.2254C1.49404 8.98956 1.59185 8.76191 1.77253 8.60916L10.0137 1.67521C10.2945 1.4387 10.7056 1.4387 10.9865 1.67454C10.9865 1.67521 19.2276 8.60934 19.2276 8.60934C19.4083 8.76211 19.5061 8.98976 19.4927 9.22559L18.8669 19.7979C18.8436 20.1933 18.5145 20.5026 18.1155 20.5026H14.2649C14.0654 20.5026 13.8733 20.424 13.7326 20.2831C13.5909 20.1432 13.5119 19.9522 13.5119 19.7538V16.0097C13.5119 14.769 12.5006 13.7633 11.2531 13.7633H9.74716C8.49958 13.7633 7.4883 14.769 7.4883 16.0097V19.7538C7.4883 19.9522 7.40931 20.1432 7.26763 20.2831C7.12695 20.424 6.93485 20.5026 6.73536 20.5026L6.73529 20.5024Z'
        fill='inherit'
      />
    </svg>
  );
}
