export interface Variant {
  _id: string;
  fragrance: string;
  price: string;
  stock: string;
  discountedPrice?: string;
  discountedFrom?: Date;
  discountedTo?: Date;
  images: string[];
}
