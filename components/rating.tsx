"use client";

import { FC, useState } from "react";
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
}

export const Rating: FC<Props> = ({ value, readonly }) => {
  const [rating, setRating] = useState(value);

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
