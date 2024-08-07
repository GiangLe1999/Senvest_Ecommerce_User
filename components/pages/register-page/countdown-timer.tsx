import React, { FC, useEffect } from "react";

interface Props {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const CountdownTimer: FC<Props> = ({ count, setCount }) => {
  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [count]);

  return <span className="font-bold">{count}s</span>;
};

export default CountdownTimer;
