import SectionContainer from "@/components/section-container";
import { FC } from "react";
import SloganCarousel from "./slogan-carousel";
import LanguageSwitcher from "./language-switcher";
import { getSlogans } from "@/queries/slogans.queries";
import { Slogan } from "@/entities/slogan.entity";

interface Props {}

const Header: FC<Props> = async (props): Promise<JSX.Element> => {
  const { data } = await getSlogans();
  return (
    <header>
      <div className="bg-primary">
        <SectionContainer className="grid grid-cols-12 h-10">
          <div className="col-span-3" />
          <div className="col-span-6">
            <SloganCarousel slogans={data.slogans as Slogan[]} />
          </div>
          <div className="col-span-3">
            <LanguageSwitcher />
          </div>
        </SectionContainer>
      </div>

      <div>
        <SectionContainer>test</SectionContainer>
      </div>
    </header>
  );
};

export default Header;
