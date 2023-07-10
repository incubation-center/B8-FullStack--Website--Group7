import { HTMLAttributes } from 'react';

export default function ThemeSwitchingSvg({
  className
}: {
  className?: HTMLAttributes<SVGElement>['className'];
}) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='22'
      viewBox='0 0 24 22'
      fill='none'
    >
      <path
        d='M4.71559 10.9969C4.32698 10.9969 3.9471 11.1121 3.62398 11.328C3.30087 11.5439 3.04903 11.8508 2.90031 12.2098C2.7516 12.5689 2.71269 12.9639 2.7885 13.3451C2.86432 13.7262 3.05145 14.0763 3.32624 14.3511C3.60102 14.6259 3.95113 14.813 4.33227 14.8888C4.71341 14.9646 5.10847 14.9257 5.4675 14.777C5.82653 14.6283 6.13339 14.3765 6.34929 14.0533C6.56519 13.7302 6.68043 13.3503 6.68043 12.9617C6.67982 12.4408 6.47261 11.9414 6.10426 11.5731C5.73592 11.2047 5.23651 10.9975 4.71559 10.9969ZM4.71559 14.1406C4.48242 14.1406 4.25449 14.0715 4.06062 13.942C3.86675 13.8124 3.71565 13.6283 3.62642 13.4129C3.53719 13.1975 3.51385 12.9604 3.55934 12.7317C3.60483 12.5031 3.7171 12.293 3.88198 12.1281C4.04685 11.9633 4.25691 11.851 4.4856 11.8055C4.71428 11.76 4.95132 11.7833 5.16673 11.8726C5.38215 11.9618 5.56627 12.1129 5.69581 12.3068C5.82535 12.5006 5.89449 12.7286 5.89449 12.9617C5.89415 13.2743 5.76983 13.574 5.54882 13.795C5.32781 14.016 5.02815 14.1403 4.71559 14.1406ZM8.2523 15.3195C7.86369 15.3195 7.48381 15.4348 7.16069 15.6507C6.83758 15.8666 6.58574 16.1734 6.43702 16.5325C6.28831 16.8915 6.2494 17.2866 6.32521 17.6677C6.40103 18.0488 6.58816 18.3989 6.86295 18.6737C7.13774 18.9485 7.48784 19.1357 7.86898 19.2115C8.25012 19.2873 8.64518 19.2484 9.00421 19.0997C9.36324 18.9509 9.6701 18.6991 9.886 18.376C10.1019 18.0529 10.2171 17.673 10.2171 17.2844C10.2165 16.7635 10.0093 16.2641 9.64097 15.8957C9.27263 15.5274 8.77322 15.3202 8.2523 15.3195ZM8.2523 18.4633C8.01913 18.4633 7.7912 18.3941 7.59734 18.2646C7.40347 18.1351 7.25236 17.9509 7.16313 17.7355C7.07391 17.5201 7.05056 17.2831 7.09605 17.0544C7.14154 16.8257 7.25382 16.6156 7.41869 16.4508C7.58356 16.2859 7.79362 16.1736 8.02231 16.1281C8.25099 16.0826 8.48803 16.106 8.70345 16.1952C8.91886 16.2845 9.10298 16.4356 9.23252 16.6294C9.36206 16.8233 9.4312 17.0512 9.4312 17.2844C9.43086 17.5969 9.30655 17.8966 9.08553 18.1176C8.86452 18.3386 8.56486 18.4629 8.2523 18.4633ZM5.89449 9.42503C6.2831 9.42503 6.66298 9.30979 6.9861 9.09389C7.30921 8.87799 7.56105 8.57113 7.70977 8.2121C7.85848 7.85307 7.89739 7.45801 7.82158 7.07687C7.74576 6.69573 7.55863 6.34563 7.28384 6.07084C7.00906 5.79605 6.65895 5.60892 6.27781 5.53311C5.89667 5.45729 5.50161 5.4962 5.14258 5.64492C4.78355 5.79363 4.47669 6.04547 4.26079 6.36858C4.04489 6.6917 3.92965 7.07158 3.92965 7.46019C3.93026 7.98111 4.13747 8.48052 4.50582 8.84887C4.87416 9.21721 5.37357 9.42442 5.89449 9.42503ZM5.89449 6.28129C6.12766 6.28129 6.35559 6.35043 6.54946 6.47997C6.74332 6.60951 6.89443 6.79363 6.98366 7.00904C7.07289 7.22446 7.09623 7.4615 7.05074 7.69018C7.00525 7.91887 6.89298 8.12893 6.7281 8.2938C6.56323 8.45867 6.35317 8.57095 6.12448 8.61644C5.8958 8.66193 5.65876 8.63858 5.44334 8.54935C5.22793 8.46013 5.04381 8.30902 4.91427 8.11515C4.78473 7.92128 4.71559 7.69336 4.71559 7.46019C4.71593 7.14763 4.84024 6.84797 5.06126 6.62696C5.28227 6.40594 5.58193 6.28163 5.89449 6.28129ZM11.0031 6.67425C11.3917 6.67425 11.7716 6.55902 12.0947 6.34312C12.4178 6.12722 12.6696 5.82035 12.8183 5.46133C12.9671 5.1023 13.006 4.70724 12.9302 4.3261C12.8543 3.94495 12.6672 3.59485 12.3924 3.32007C12.1176 3.04528 11.7675 2.85814 11.3864 2.78233C11.0053 2.70652 10.6102 2.74543 10.2512 2.89414C9.89213 3.04286 9.58527 3.29469 9.36937 3.61781C9.15347 3.94093 9.03823 4.32081 9.03823 4.70942C9.03885 5.23034 9.24605 5.72975 9.6144 6.09809C9.98274 6.46644 10.4822 6.67364 11.0031 6.67425ZM11.0031 3.53051C11.2362 3.53051 11.4642 3.59965 11.658 3.72919C11.8519 3.85873 12.003 4.04285 12.0922 4.25827C12.1815 4.47369 12.2048 4.71072 12.1593 4.93941C12.1138 5.16809 12.0016 5.37815 11.8367 5.54303C11.6718 5.7079 11.4618 5.82018 11.2331 5.86567C11.0044 5.91116 10.7673 5.88781 10.5519 5.79858C10.3365 5.70935 10.1524 5.55825 10.0229 5.36438C9.89331 5.17051 9.82417 4.94258 9.82417 4.70942C9.82451 4.39686 9.94883 4.0972 10.1698 3.87618C10.3909 3.65517 10.6905 3.53085 11.0031 3.53051ZM23.3278 0.244013C22.3199 -0.763879 19.3144 1.56611 17.4704 3.29894C16.1677 2.19441 14.6177 1.42069 12.952 1.04355C11.2862 0.666401 9.55408 0.696974 7.9027 1.13267C6.25132 1.56836 4.72954 2.3963 3.46668 3.54612C2.20382 4.69593 1.23723 6.13363 0.649032 7.73704C0.0608383 9.34045 -0.131561 11.0622 0.0881846 12.7559C0.30793 14.4495 0.933325 16.0652 1.91122 17.4654C2.88911 18.8656 4.1906 20.009 5.70507 20.7985C7.21954 21.588 8.90222 22.0001 10.6101 22C11.7307 22 12.6106 21.6155 13.0251 20.9447C13.2857 20.5233 13.4802 19.788 12.9265 18.6805C12.7298 18.3221 12.6251 17.9206 12.6215 17.5118C12.618 17.1031 12.7157 16.6998 12.9061 16.338C13.3179 15.6718 14.1545 15.3195 15.3257 15.3195C18.2404 15.3195 21.2202 14.8525 21.2202 11.3899C21.218 9.65428 20.7901 7.94574 19.974 6.414C21.7199 4.61811 24.3951 1.31206 23.3278 0.244013ZM22.7722 0.799693C23.0182 1.06487 22.0956 3.18513 19.1886 6.09171C18.4821 6.80086 17.733 7.46641 16.9457 8.08466C16.572 7.49773 16.0741 6.99987 15.4872 6.62616C16.1054 5.83882 16.771 5.08979 17.4801 4.38322C20.3871 1.47626 22.5077 0.554473 22.7722 0.799693ZM14.196 8.59503C14.4345 8.12816 14.7089 7.68053 15.0168 7.25619C15.5452 7.58182 15.99 8.02663 16.3156 8.55502C15.8913 8.86291 15.4437 9.13735 14.9768 9.37585C14.7816 9.05776 14.5141 8.79023 14.196 8.59503ZM14.5398 10.6039C14.5398 11.5334 13.5716 12.5688 12.182 12.5688C11.3337 12.6055 10.5027 12.3216 9.8541 11.7736C10.6857 11.5936 11.0599 10.891 11.3749 10.2996C11.7936 9.51368 12.0945 9.03206 12.9679 9.03206C13.3847 9.03248 13.7842 9.19822 14.0789 9.49291C14.3736 9.7876 14.5394 10.1872 14.5398 10.6039ZM15.3257 14.5336C13.4841 14.5336 12.6298 15.29 12.2376 15.9247C11.9739 16.3996 11.8343 16.9334 11.8319 17.4765C11.8294 18.0197 11.9641 18.5547 12.2234 19.032C12.5381 19.661 12.583 20.1656 12.3566 20.5317C12.0926 20.9589 11.4398 21.2141 10.6101 21.2141C9.03069 21.2167 7.47392 20.8384 6.07178 20.1114C4.66964 19.3843 3.46346 18.33 2.55548 17.0376C1.64751 15.7453 1.0645 14.2531 0.855887 12.6875C0.647274 11.1219 0.819203 9.5291 1.3571 8.04409C1.895 6.55909 2.78301 5.22566 3.94585 4.15685C5.1087 3.08803 6.51209 2.31534 8.03708 1.90427C9.56207 1.49319 11.1637 1.45586 12.7062 1.79543C14.2487 2.135 15.6865 2.84146 16.8979 3.85493C15.3062 5.45057 14.0562 7.07643 13.4661 8.30021C13.3025 8.26452 13.1354 8.24639 12.9679 8.24613C11.5779 8.24613 11.081 9.17982 10.6815 9.93006C10.2521 10.7363 9.98688 11.1489 9.10271 11.0023C9.03121 10.9904 8.95782 10.9985 8.89065 11.0257C8.82347 11.0529 8.76513 11.0982 8.72208 11.1565C8.67903 11.2148 8.65294 11.2839 8.6467 11.3561C8.64045 11.4283 8.6543 11.5008 8.68671 11.5656C8.72317 11.6385 9.61079 13.3547 12.182 13.3547C14.0624 13.3547 15.3257 11.9325 15.3257 10.6039C15.3255 10.4364 15.3073 10.2694 15.2716 10.1057C16.7895 9.27472 18.1771 8.22521 19.3898 6.99083C20.0753 8.35602 20.4329 9.86226 20.4343 11.3899C20.4343 13.6521 19.0021 14.5336 15.3257 14.5336Z'
        fill='inherit'
      />
    </svg>
  );
}
