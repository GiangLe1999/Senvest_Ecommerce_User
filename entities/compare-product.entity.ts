import { LocalizedString } from "./common.entity";

export interface CompareProduct {
  _id: string;
  name: LocalizedString;
  slug: LocalizedString;
  image: string;
  variant_id: string;
  scent: string;
  price: string;
  description: LocalizedString;
  locale: string;
}
