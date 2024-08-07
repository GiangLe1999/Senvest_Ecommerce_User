import { LocalizedString } from "./common.entity";

export interface Category {
  _id: string;
  email: string;
  name: string;
  gender: string;
  date_of_birth?: Date;
  receive_offers: boolean;
  is_verified: boolean;
}
