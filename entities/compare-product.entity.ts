import { LocalizedString } from "./common.entity";

export interface CompareProduct {
  _id: string;
  name: LocalizedString;
  slug: LocalizedString;
  image: string;
  variant_id: string;
  scent: string;
  stock: string;
  price: string;
  discountedPrice?: string;
  discountedFrom?: Date;
  discountedTo?: Date;
  description: LocalizedString;
  locale: string;
  rating: string;
}
