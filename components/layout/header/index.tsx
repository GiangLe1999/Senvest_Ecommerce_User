import SectionContainer from "@/components/section-container";
import { FC } from "react";
import SloganCarousel from "./slogan-carousel";
import LanguageSwitcher from "./language-switcher";

interface Props {}

const Header: FC<Props> = (props): JSX.Element => {
  return (
    <header className="bg-primary">
      <SectionContainer className="grid grid-cols-12 h-10">
        <div className="col-span-3" />
        <div className="col-span-6">
          <SloganCarousel />
        </div>
        <div className="col-span-3">
          <LanguageSwitcher />
        </div>
      </SectionContainer>
    </header>
  );
};

export default Header;
