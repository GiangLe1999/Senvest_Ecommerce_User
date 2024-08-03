import { LocalizedString } from "./common.entity";

export interface Category {
  _id: string;
  name: any;
  description: LocalizedString;
  slug: any;
  image: LocalizedString;
  status: string;
  products: any[];
}
