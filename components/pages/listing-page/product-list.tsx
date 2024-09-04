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
        <div className="grid grid-cols-3 gap-10 mt-12">
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
