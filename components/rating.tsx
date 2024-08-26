"use client";

import { FC, useEffect, useState } from "react";
import { Rating as ReactRating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: "#B26C53",
  inactiveFillColor: "#fad2c1",
};

interface Props {
  value: number;
  readonly?: boolean;
  onChange?: (value: number) => void;
}

export const Rating: FC<Props> = ({ value, readonly, onChange }) => {
  const [rating, setRating] = useState(value);

  useEffect(() => {
    if (onChange) onChange(rating);
  }, [rating]);

  return (
    <ReactRating
      style={{ maxWidth: 100 }}
      value={rating}
      onChange={setRating}
      readOnly={readonly}
      itemStyles={myStyles}
    />
  );
};
