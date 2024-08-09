export enum GenderEnum {
  male = "male",
  female = "female",
}

export interface User {
  _id: string;
  email: string;
  name: string;
  gender: GenderEnum;
  date_of_birth?: Date;
  receive_offers: boolean;
  is_verified: boolean;
}
