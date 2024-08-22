import { FC } from "react";
import "./candle.css";

interface Props {}

const LoadingPageCandle: FC<Props> = (props): JSX.Element => {
  return (
    <div className="holder">
      <div className="candle">
        <div className="blinking-glow"></div>
        <div className="thread"></div>
        <div className="glow"></div>
        <div className="flame"></div>
      </div>
    </div>
  );
};

export default LoadingPageCandle;
