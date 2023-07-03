import { HTMLAttributes } from 'react';

export default function RequestStatusSvg({
  className
}: {
  className?: HTMLAttributes<HTMLElement>['className'];
}): JSX.Element {
  return (
    <svg width="17" height="19" viewBox="0 0 17 19" fill="inherit" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5214 0.790337C12.5214 1.22425 12.1805 1.56518 11.7466 1.56518H2.32452C1.89061 1.56518 1.54968 1.90611 1.54968 2.34002V16.2871C1.54968 16.7211 1.89061 17.062 2.32452 17.062H13.1103C13.5442 17.062 13.8851 16.7211 13.8851 16.2871V6.52416C13.8851 6.09025 14.2261 5.74932 14.66 5.74932C15.0939 5.74932 15.4348 6.09025 15.4348 6.52416V16.2871C15.4348 17.5579 14.381 18.6117 13.1103 18.6117H2.32452C1.05378 18.6117 0 17.5579 0 16.2871V2.34002C0 1.06928 1.05378 0.0154968 2.32452 0.0154968H11.7466C12.1805 0.0154968 12.5214 0.356427 12.5214 0.790337ZM3.22334 5.43938H7.22151C7.65542 5.43938 7.99635 5.09845 7.99635 4.66454C7.99635 4.23063 7.65542 3.8897 7.22151 3.8897H3.22334C2.78943 3.8897 2.4485 4.23063 2.4485 4.66454C2.4485 5.09845 2.78943 5.43938 3.22334 5.43938ZM3.22334 8.78669H7.22151C7.65542 8.78669 7.99635 8.44576 7.99635 8.01185C7.99635 7.57794 7.65542 7.23701 7.22151 7.23701H3.22334C2.78943 7.23701 2.4485 7.57794 2.4485 8.01185C2.4485 8.44576 2.78943 8.78669 3.22334 8.78669ZM12.3355 10.3674H3.09936C2.66545 10.3674 2.32452 10.7083 2.32452 11.1422C2.32452 11.5761 2.66545 11.917 3.09936 11.917H12.3355C12.7694 11.917 13.1103 11.5761 13.1103 11.1422C13.1103 10.7083 12.7694 10.3674 12.3355 10.3674ZM12.3355 13.4357H3.09936C2.66545 13.4357 2.32452 13.7767 2.32452 14.2106C2.32452 14.6445 2.66545 14.9854 3.09936 14.9854H12.3355C12.7694 14.9854 13.1103 14.6445 13.1103 14.2106C13.1103 13.7767 12.7694 13.4357 12.3355 13.4357ZM16.7675 0.232452C16.4576 -0.077484 15.9617 -0.077484 15.6828 0.232452L10.1349 5.74932C9.82498 6.05925 9.82498 6.55515 10.1349 6.83409C10.2899 6.98906 10.4758 7.05105 10.6928 7.05105C10.8788 7.05105 11.0957 6.98906 11.2507 6.83409L16.7675 1.34822C17.0775 1.03829 17.0775 0.542388 16.7675 0.232452Z" fill="inherit"/>
    </svg>

  );
}
