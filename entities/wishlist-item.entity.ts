export enum PriorityEnum {
  high = "high",
  medium = "medium",
  low = "low",
}

export interface WishlistItem {
  _id: string;
  quantity: number;
  variant_id: string;
  priority: PriorityEnum;
}
