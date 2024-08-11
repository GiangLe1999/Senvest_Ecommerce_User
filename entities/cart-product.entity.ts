import { LocalizedString } from "./common.entity";

export interface CartProduct {
  _id: string;
  name: LocalizedString;
  image: string;
  quantity: number;
  variant_id: string;
  scent: string;
  price: string;
  stock: string;
}
