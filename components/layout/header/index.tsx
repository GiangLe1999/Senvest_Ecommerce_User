import SectionContainer from "@/components/section-container";
import { FC } from "react";
import SloganCarousel from "./slogan-carousel";
import LanguageSwitcher from "./language-switcher";
import { getSlogans } from "@/queries/slogans.queries";
import { Slogan } from "@/entities/slogan.entity";
import Logo from "./logo";
import Navigation from "./navigation";
import PersonalItems from "./personal-items";
import CartItem from "./cart-item";
import WishlistItem from "./wishlist-item";
import SearchItem from "./search-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Props {}

const Header: FC<Props> = async (props): Promise<JSX.Element> => {
  const { slogans } = await getSlogans();
  const session = await getServerSession(authOptions);

  return (
    <header className="border-b">
      <div className="bg-primary">
        <SectionContainer className="grid grid-cols-12 h-10">
          <div className="col-span-3" />
          <div className="col-span-6">
            <SloganCarousel slogans={slogans as Slogan[]} />
          </div>
          <div className="col-span-3">
            <LanguageSwitcher />
          </div>
        </SectionContainer>
      </div>

      <div>
        <SectionContainer className="grid grid-cols-12 h-[88px] py-4">
          <div className="col-span-2">
            <Logo />
          </div>
          <div className="col-span-8">
            <Navigation />
          </div>
          <div className="col-span-2 grid grid-cols-4 gap-1 ml-auto">
            <PersonalItems session={session} />
            <CartItem />
            <WishlistItem />
            <SearchItem />
          </div>
        </SectionContainer>
      </div>
    </header>
  );
};

export default Header;
