import { FC } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlignLeft,
  DollarSignIcon,
  HeartHandshakeIcon,
  HeartIcon,
  NewspaperIcon,
  PackagePlusIcon,
  ShoppingCartIcon,
  TicketPercentIcon,
} from "lucide-react";
import { Link } from "@/configs/i18n-navigation";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import MobileShopCollectionItems from "./mobile-shop-collection-items";
import MobileMissionItems from "./mobile-mission-items";
import MobileNavigationFooter from "./mobile-navigation-footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Session } from "next-auth";

interface Props {
  session: Session | null;
}

const MobileNavigation: FC<Props> = ({ session }): JSX.Element => {
  const t = useTranslations("navigation");

  return (
    <Sheet>
      <SheetTrigger
        className="h-full flex items-center justify-start"
        aria-label="Open mobile navigation"
      >
        <AlignLeft className="w-6 h-6" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-white flex flex-col pr-0 pb-0">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="flex items-center w-full">
              <Image
                src="/logo.png"
                alt="Kindle Hope Candles Logo"
                width={75}
                height={56.25}
                priority
                className="mx-auto"
              />
            </Link>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex flex-col justify-between flex-1 pr-8">
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="shop">
              <AccordionTrigger className="hover:no-underline hover:text-primary transition font-bold justify-between gap-x-3 py-2.5">
                <Link href="/bo-suu-tap/tat-ca">
                  <SheetClose className="flex items-center gap-x-1">
                    <div className="w-8 h-8 grid place-content-center">
                      <ShoppingCartIcon className="w-4 h-4" />
                    </div>
                    {t("shop")}
                  </SheetClose>
                </Link>
              </AccordionTrigger>
              <AccordionContent className="text-muted pl-2">
                <MobileShopCollectionItems />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="new">
              <AccordionTrigger
                className="hover:no-underline hover:text-primary transition font-bold justify-between gap-x-3 py-2.5"
                showIcon={false}
              >
                <Link href="/bo-suu-tap/san-pham-moi">
                  <SheetClose className="flex items-center gap-x-1">
                    <div className="w-8 h-8 grid place-content-center">
                      <PackagePlusIcon className="w-4 h-4" />
                    </div>
                    {t("new")}
                  </SheetClose>
                </Link>
              </AccordionTrigger>
            </AccordionItem>

            <AccordionItem value="best_sellers">
              <AccordionTrigger
                className="hover:no-underline hover:text-primary transition font-bold justify-between gap-x-3 py-2.5"
                showIcon={false}
              >
                <Link href="/bo-suu-tap/ban-chay">
                  <SheetClose className="flex items-center gap-x-1">
                    <div className="w-8 h-8 grid place-content-center">
                      <DollarSignIcon className="w-4 h-4" />
                    </div>
                    {t("best_sellers")}
                  </SheetClose>
                </Link>
              </AccordionTrigger>
            </AccordionItem>

            <AccordionItem value="sale">
              <AccordionTrigger
                className="hover:no-underline hover:text-primary transition font-bold justify-between gap-x-3 py-2.5"
                showIcon={false}
              >
                <Link href="/bo-suu-tap/khuyen-mai">
                  <SheetClose className="flex items-center gap-x-1">
                    <div className="w-8 h-8 grid place-content-center">
                      <TicketPercentIcon className="w-4 h-4" />
                    </div>
                    {t("sale")}
                  </SheetClose>
                </Link>
              </AccordionTrigger>
            </AccordionItem>

            {session && (
              <AccordionItem value="wishlist">
                <AccordionTrigger
                  className="hover:no-underline hover:text-primary transition font-bold justify-between gap-x-3 py-2.5"
                  showIcon={false}
                >
                  <Link href="/tai-khoan/san-pham-yeu-thich">
                    <SheetClose className="flex items-center gap-x-1">
                      <div className="w-8 h-8 grid place-content-center">
                        <HeartIcon className="w-4 h-4" />
                      </div>
                      {t("wishlist")}
                    </SheetClose>
                  </Link>
                </AccordionTrigger>
              </AccordionItem>
            )}

            <AccordionItem value="mission">
              <AccordionTrigger className="hover:no-underline hover:text-primary transition font-bold justify-between gap-x-3 py-2.5">
                <Link href="/su-menh">
                  <SheetClose className="flex items-center gap-x-1">
                    <div className="w-8 h-8 grid place-content-center">
                      <HeartHandshakeIcon className="w-4 h-4" />
                    </div>
                    {t("mission")}
                  </SheetClose>
                </Link>
              </AccordionTrigger>
              <AccordionContent className="text-muted pl-2">
                <MobileMissionItems />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="blogs">
              <AccordionTrigger
                className="hover:no-underline hover:text-primary transition font-bold justify-between gap-x-3 py-2.5"
                showIcon={false}
              >
                <Link
                  href={"http://blog.kindlehopecandles.com" as any}
                  target="_blank"
                >
                  <SheetClose className="flex items-center gap-x-1">
                    <div className="w-8 h-8 grid place-content-center">
                      <NewspaperIcon className="w-4 h-4" />
                    </div>
                    {t("blogs")}
                  </SheetClose>
                </Link>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>

          <MobileNavigationFooter />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
