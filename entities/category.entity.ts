import { LocalizedString } from "./common.entity";

export interface Category {
  _id: string;
  name: LocalizedString;
  description: LocalizedString;
  slug: LocalizedString;
  image: string;
  status: string;
  products: any[];
}
