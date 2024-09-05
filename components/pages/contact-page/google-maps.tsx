import { FC } from "react";

interface Props {}

const GoogleMaps: FC<Props> = (props): JSX.Element => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.465250401064!2d108.10517287590676!3d12.683028021137746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3171f71b20bf2ef5%3A0x561b509a98063b5!2zMTYgTcOhIEhhaSwgVMOibiBIb8OgLCBUaMOgbmggcGjhu5EgQnXDtG4gTWEgVGh14buZdCwgxJDhuq9rIEzhuq9rLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1725552647194!5m2!1svi!2s"
      className="w-full aspect-square rounded-sm shadow-md"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      title="Kindle Hope Candles location"
    ></iframe>
  );
};

export default GoogleMaps;
