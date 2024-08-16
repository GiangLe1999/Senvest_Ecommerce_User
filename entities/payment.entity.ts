export const enum StatusEnum {
  pending = "pending",
  cancelled = "cancelled",
  paid = "paid",
}
export interface Payment {
  _id: string;
  orderCode: number;
  status: StatusEnum;
}
