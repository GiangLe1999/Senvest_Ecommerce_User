import { Rating } from "@/components/rating";
import { Review } from "@/entities/review.entity";
import { formatDate, replaceFirstFiveCharacters } from "@/lib/utils";
import { useLocale } from "next-intl";
import React, { FC } from "react";

const avatarBackgroundColors = [
  "#FF5733",
  "#3357FF",
  "#FF33A1",
  "#0eaca1",
  "#8E44AD",
  "#F39C12",
  "#2980B9",
  "#27AE60",
];

interface Props {
  review: Review;
}

const getRandomColor = () => {
  return avatarBackgroundColors[
    Math.floor(Math.random() * avatarBackgroundColors.length)
  ];
};

const ReviewCard: FC<Props> = ({ review }): JSX.Element => {
  const avatarColor = getRandomColor();
  const initial = review.name.charAt(0).toUpperCase();
  const locale = useLocale();

  return (
    <div className="py-6 sm:flex gap-10 border-b">
      <div className="sm:w-[30%] w-full flex items-start gap-4">
        <div
          className="relative w-12 aspect-square rounded-md flex items-center justify-center"
          style={{ backgroundColor: avatarColor }}
        >
          <span className="text-white text-4xl font-bold">{initial}</span>
        </div>
        <div>
          <p className="font-bold text-sm">{review.name}</p>
          <p className="text-xs">
            <span className="font-bold text-muted">Email: </span>
            {replaceFirstFiveCharacters(review.email)}
          </p>
          <p className="text-xs">
            <span className="font-bold text-muted">Scent: </span>
            {review.variant.fragrance}
          </p>
        </div>
      </div>

      <div className="flex-1 sm:mt-0 mt-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="-mt-1">
            <Rating readonly value={review.rating} />
          </div>
          <span className="text-sm text-muted">
            {formatDate(review.createdAt, locale)}
          </span>
        </div>

        <div>
          <p className="text-sm">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
