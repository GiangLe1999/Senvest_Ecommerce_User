import { FC } from "react";

interface Props {}

const GoogleMaps: FC<Props> = (props): JSX.Element => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.7509080012251!2d106.70378426955753!3d10.811033099333752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752895fdb128c5%3A0x779172b7141d15c3!2zMjQ1IENodSBWxINuIEFuLCBQaMaw4budbmcgMjYsIELDrG5oIFRo4bqhbmgsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1727087328595!5m2!1svi!2s"
      className="w-full aspect-square rounded-sm shadow-md"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      title="Kindle Hope Candles location"
    ></iframe>
  );
};

export default GoogleMaps;
