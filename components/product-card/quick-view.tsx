import { FC } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Product } from "@/entities/product.entity";
import Image from "next/image";
import Price from "./price";
import parse from "html-react-parser";
import Variants from "./variants";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ShoppingBagIcon } from "lucide-react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: Product;
  activeVariant: Product["variants"][0];
  isVi: boolean;
  activeVariantIndex: number;
  setActiveVariantIndex: React.Dispatch<React.SetStateAction<number>>;
}

const QuickView: FC<Props> = ({
  open,
  setOpen,
  product,
  activeVariant,
  isVi,
  activeVariantIndex,
  setActiveVariantIndex,
}): JSX.Element => {
  const t = useTranslations("product_card");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[70%] flex items-center gap-10"
        closeButtonClassName="-top-3 -right-3 bg-primary text-white rounded-full w-8 h-8 grid place-items-center border-2 border-white opacity-100"
      >
        <div className="w-1/2 aspect-square">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="border rounded-sm"
          >
            <CarouselContent>
              {activeVariant.images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="relative w-full aspect-square group"
                >
                  <Image
                    key={index}
                    src={image}
                    alt={
                      isVi
                        ? `${product.name.vi} ${activeVariant.fragrance} ${index}`
                        : `${product.name.en} ${activeVariant.fragrance} ${index}`
                    }
                    fill
                    sizes="100vw"
                    style={{
                      objectFit: "cover",
                    }}
                    priority={index === 0}
                  />
                  <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 bg-secondary shadow-md border-none opacity-0 group-hover:opacity-100 group-hover:left-4 transition-all cursor-pointer" />
                  <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 bg-secondary shadow-md border-none opacity-0 group-hover:opacity-100 group-hover:right-4 transition-all cursor-pointer" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="flex-1">
          <Price activeVariant={activeVariant} />
          <p className="text-2xl my-3">
            {isVi ? product.name.vi : product.name.en}
          </p>
          <p className="text-muted">
            {isVi
              ? parse(product.description.vi)
              : parse(product.description.en)}
          </p>

          <div className="my-3">
            <p className="text-muted font-bold mb-2">{t("scent")}:</p>
            <Variants
              {...{ product, activeVariantIndex, setActiveVariantIndex }}
            />
          </div>

          <Button>
            <ShoppingBagIcon className="w-4 h-4 mr-2" />
            {t("add_to_cart")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickView;
