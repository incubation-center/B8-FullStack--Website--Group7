import { HTMLAttributes, CSSProperties } from 'react';

interface ArchivedAdminSvgProps {
  className?: HTMLAttributes<HTMLElement>['className'];
}

export default function ArchivedAdminSvg({
  className
}: ArchivedAdminSvgProps): JSX.Element {
  const maskStyle: CSSProperties = {
    maskType: 'luminance'
  };

  return (
    <svg
      className={className}
      width='27'
      height='27'
      viewBox='0 0 27 27'
      fill='inherit'
      xmlns='http://www.w3.org/2000/svg'
    >
      <mask
        id='mask0_508_130'
        style={maskStyle}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='27'
        height='27'
      >
        <path d='M27 0H0V27H27V0Z' fill='inherit' />
      </mask>
      <g mask='url(#mask0_508_130)'>{/* Rest of the SVG code */}</g>
    </svg>
  );
}
