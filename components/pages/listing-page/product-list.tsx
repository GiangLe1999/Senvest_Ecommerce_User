import Empty from "@/components/empty";
import ProductCard from "@/components/product-card";
import { Product } from "@/entities/product.entity";
import { FC } from "react";

interface Props {
  renderProducts: Product[];
}

const ProductList: FC<Props> = ({ renderProducts }): JSX.Element => {
  return (
    <>
      {renderProducts && renderProducts.length > 0 ? (
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-10 gap-6 mt-12">
          {renderProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isProductListPage
            />
          ))}
        </div>
      ) : (
        <Empty className="my-20" />
      )}
    </>
  );
};

export default ProductList;
