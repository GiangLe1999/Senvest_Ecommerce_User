import { FC } from "react";

interface Props {
  className: string;
}

const Messenger: FC<Props> = ({ className }): JSX.Element => {
  return (
    <svg
      className={className}
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="22" cy="22" r="22" fill="url(#paint3_linear)"></circle>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.0026 7.70215C14.1041 7.70215 7.70117 13.6308 7.70117 20.9442C7.70117 25.1115 9.78083 28.8286 13.0309 31.256V36.305L17.9004 33.6325C19.2 33.9922 20.5767 34.1863 22.0026 34.1863C29.9011 34.1863 36.304 28.2576 36.304 20.9442C36.304 13.6308 29.9011 7.70215 22.0026 7.70215ZM23.4221 25.5314L19.7801 21.6471L12.6738 25.5314L20.4908 17.2331L24.2216 21.1174L31.239 17.2331L23.4221 25.5314Z"
        fill="white"
      ></path>
      <defs>
        <linearGradient
          id="paint3_linear"
          x1="21.6426"
          y1="43.3555"
          x2="21.6426"
          y2="0.428639"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="50%" stopColor="#1168CF"></stop>
          <stop offset="100%" stopColor="#2CB7FF"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Messenger;
