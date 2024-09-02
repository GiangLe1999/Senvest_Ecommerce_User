import { FC } from "react";

interface Props {
  categoryName?: string;
  categoryDesc?: string;
  t: any;
}

const ProductList: FC<Props> = ({
  categoryName,
  categoryDesc,
  t,
}): JSX.Element => {
  return (
    <div>
      <h1 className="font-bold text-2xl text-primary mb-2">{categoryName}</h1>
      <p className="text-sm text-muted mb-4">{categoryDesc}</p>
    </div>
  );
};

export default ProductList;
