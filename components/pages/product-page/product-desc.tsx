import { LocalizedString } from "@/entities/common.entity";
import { FC } from "react";
import parse from "html-react-parser";

interface Props {
  t: any;
  isVi: boolean;
  description: LocalizedString;
}

const ProductDesc: FC<Props> = ({ t, isVi, description }): JSX.Element => {
  return (
    <article className="prose max-w-none">
      {parse(description[isVi ? "vi" : "en"])}
    </article>
  );
};

export default ProductDesc;
