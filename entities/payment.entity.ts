import { NotUserInfo } from "./not-user-info-entity";

export const enum StatusEnum {
  pending = "pending",
  cancelled = "cancelled",
  paid = "paid",
}
export interface Payment {
  _id: string;
  orderCode: number;
  status: StatusEnum;
  amount: number;
  transactionDateTime: Date;
  items: any;
  createdAt: Date;
  updatedAt: Date;
  not_user_info?: NotUserInfo;
  user_address?: any;
  coupon_code?: string;
  coupon_value?: number;
}
