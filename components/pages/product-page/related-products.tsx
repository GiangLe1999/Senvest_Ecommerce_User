import { getRelatedProducts } from "@/queries/products.queries";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "@/components/product-card";
import { Product } from "@/entities/product.entity";

interface Props {
  product_id: string;
  t: any;
  category_id: string;
}

const RelatedProducts: FC<Props> = ({
  product_id,
  t,
  category_id,
}): JSX.Element => {
  const { data } = useQuery({
    queryKey: ["related_products_" + product_id],
    queryFn: () => getRelatedProducts({ _id: product_id, category_id }),
  });

  return (
    <div>
      <div className="text-center">
        <span className="font-grey_qo text-3xl">{t("suggest_for_you")}</span>
        <h3 className="text-2xl font-bold text-primary mt-3">
          {t("related_products")}
        </h3>
        <div className="w-[100px] h-[1.5px] bg-primary/60 mx-auto mt-2"></div>
      </div>

      {data?.products && data?.products?.length > 0 ? (
        <Carousel
          opts={{
            loop: true,
            dragFree: true,
          }}
          className="mt-10"
        >
          <CarouselContent className="lg:w-[24.5%] sm:w-[32.7%] w-[48%] pl-0 ml-4">
            {data?.products?.map((product: Product, index: number) => (
              <CarouselItem key={index}>
                <ProductCard product={product} isProductListPage />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RelatedProducts;
