/* eslint-disable @next/next/no-img-element */
import { FC, ReactNode } from "react";
import FlyingButton from "react-flying-item";

interface Props {
  src: string;
  children: ReactNode;
}

const CustomFlyingButton: FC<Props> = ({ src, children }): JSX.Element => {
  return (
    <FlyingButton
      src={src}
      animationDuration={1}
      targetTop="90%"
      targetLeft="44px"
      flyingItemStyling={{ borderRadius: "2px", width: "4rem" }}
    >
      {children}
    </FlyingButton>
  );
};

export default CustomFlyingButton;
