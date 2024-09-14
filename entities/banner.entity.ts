import { LocalizedString } from "./common.entity";

export interface Banner {
  link: string;
  image: string;
  line_1: LocalizedString;
  line_2: LocalizedString;
  line_3: LocalizedString;
  button_text: LocalizedString;
}
