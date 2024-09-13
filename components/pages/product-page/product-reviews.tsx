import { LocalizedString } from "@/entities/common.entity";
import { Variant } from "@/entities/variant.entity";
import { FC } from "react";
import AddReviewForm from "./add-review-form";
import { useQuery } from "@tanstack/react-query";
import { getProductReviews } from "@/queries/reviews.queries";
import { Review } from "@/entities/review.entity";
import { Rating } from "@/components/rating";
import { Separator } from "@/components/ui/separator";
import ReviewCard from "./review-card";

interface Props {
  t: any;
  product_id: string;
  product_name: LocalizedString;
  nums_of_reviews: number;
  variants: Variant[];
  rating: string;
}

const ratings = [
  { r: 5, c: "#32B79F" },
  { r: 4, c: "#DD7DFC" },
  { r: 3, c: "#F5C044" },
  { r: 2, c: "#3AC3F5" },
  { r: 1, c: "#F96B0D" },
];

const ProductReviews: FC<Props> = ({
  t,
  product_id,
  product_name,
  nums_of_reviews,
  variants,
  rating,
}): JSX.Element => {
  const { data } = useQuery({
    queryKey: ["product_reviews_" + product_id],
    queryFn: () => getProductReviews({ product_id, page: 1, limit: 10 }),
  });

  const overviewData = ratings.map((rating) => {
    const t = data?.overview?.find(
      (item: { rating: number; value: number }) => item.rating === rating.r
    );

    if (t) {
      return {
        rating: rating.r,
        value: t.value,
        percent: (t.value / nums_of_reviews) * 100,
        color: rating.c,
      };
    } else {
      return {
        rating: rating.r,
        value: 0,
        percent: 3,
        color: rating.c,
      };
    }
  });

  return (
    <div>
      <section id="reviews">
        <div className="grid sm:grid-cols-3 grid-cols-2 mt-4 mb-20">
          <div className="pr-8 border-r">
            <h2 className="text-lg font-bold mb-1">{t("total_reviews")}</h2>
            <span className="text-2xl font-bold">{nums_of_reviews}</span>
            <p className="text-muted text-sm mt-2">{t("total_reviews_desc")}</p>
          </div>

          <div className="px-8 border-r">
            <h2 className="text-lg font-bold mb-1">{t("average_rating")}</h2>
            <div className="text-2xl font-bold flex items-center gap-3">
              {rating}
              <Rating value={parseFloat(rating)} readonly />
            </div>
            <p className="text-muted text-sm mt-2">
              {t("average_rating_desc_1")} {nums_of_reviews}{" "}
              {t("average_rating_desc_2")}
            </p>
          </div>

          <div className="sm:px-8 px-0 sm:mt-0 mt-10 sm:col-span-1 col-span-2">
            {overviewData?.map((item) => (
              <div key={item.rating} className="flex items-center mb-2">
                <DefaultStar className="w-3 h-3 mr-2" />
                <div className="text-xs font-bold w-[25px]">{item.rating}</div>
                <div className="flex-1">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${item.percent}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
                <div className="w-[50px] shrink-0 ml-auto text-right">
                  <span className="text-xs font-bold text-muted">
                    {item.value} vote
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {nums_of_reviews ? (
          <>
            {data?.reviews?.map((review: Review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </>
        ) : (
          <></>
        )}
      </section>

      <section id="add-review" className="mt-20">
        <AddReviewForm
          t={t}
          product_id={product_id}
          product_name={product_name}
          variants={variants}
          nums_of_reviews={nums_of_reviews}
        />
      </section>
    </div>
  );
};

const DefaultStar = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 23.77"
      preserveAspectRatio="xMidYMid meet"
      fill="#D5D5D5"
    >
      <g shapeRendering="geometricPrecision">
        <path d="M12.5,18.16l-7.73,5.61,2.95-9.08L0,9.07H9.55S12.5,0,12.5,0l2.95,9.07h9.55l-7.73,5.62,2.95,9.08-7.73-5.61Z"></path>
      </g>
    </svg>
  );
};

export default ProductReviews;
