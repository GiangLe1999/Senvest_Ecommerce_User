import { Product } from "./product.entity";
import { Variant } from "./variant.entity";
import { PriorityEnum } from "./wishlist-item.entity";

export interface Wishlist {
  _id: string;
  user: string;
  items: {
    _id: Product;
    variant_id: Variant;
    quantity: number;
    priority: PriorityEnum;
  }[];
}
