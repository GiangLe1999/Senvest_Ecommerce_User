import { FC } from "react";

interface Props {
  className: string;
}

const Address: FC<Props> = ({ className }): JSX.Element => {
  return (
    <svg
      className={className}
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="22" cy="22" r="22" fill="url(#paint5_linear)"></circle>
      <path
        d="M22 10C17.0374 10 13 13.7367 13 18.3297C13 24.0297 21.0541 32.3978 21.397 32.7512C21.7191 33.0832 22.2815 33.0826 22.603 32.7512C22.9459 32.3978 31 24.0297 31 18.3297C30.9999 13.7367 26.9626 10 22 10ZM22 22.5206C19.5032 22.5206 17.4719 20.6406 17.4719 18.3297C17.4719 16.0188 19.5032 14.1388 22 14.1388C24.4968 14.1388 26.528 16.0189 26.528 18.3297C26.528 20.6406 24.4968 22.5206 22 22.5206Z"
        fill="white"
      ></path>
      <defs>
        <linearGradient
          id="paint5_linear"
          x1="22"
          y1="0"
          x2="22"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="50%" stopColor="#e6b24c"></stop>
          <stop offset="100%" stopColor="#EF9F00"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Address;
