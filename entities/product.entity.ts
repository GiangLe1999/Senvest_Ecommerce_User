import { LocalizedString } from "./common.entity";
import { Variant } from "./variant.entity";

export interface Product {
  _id: string;
  name: LocalizedString;
  slug: LocalizedString;
  description: LocalizedString;
  category: any;
  variants: Variant[];
  videos?: [];
  totalSales: number;
  totalQuantitySold: number;
  rating: string;
}
