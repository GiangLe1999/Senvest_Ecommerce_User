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
import { DotIcon, SquareArrowOutUpRightIcon } from "lucide-react";
import { useRouter } from "@/configs/i18n-navigation";

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
  const router = useRouter();

  const goToProductPage = () => {
    setOpen(false);
    router.push(`/san-pham/${isVi ? product.slug.vi : product.slug.en}` as any);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[70%] flex items-center gap-10"
        closeButtonClassName="-top-3 -right-3 bg-primary text-white rounded-full w-8 h-8 grid place-items-center border-2 border-white opacity-100"
      >
        <Carousel
          opts={{
            loop: true,
          }}
          className="w-1/2 border rounded-sm"
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
                  width={460}
                  height={460}
                />
                <CarouselPrevious className="absolute top-1/2 left-6 -translate-y-1/2 bg-secondary shadow-md border-none opacity-0 group-hover:opacity-100 group-hover:left-8 transition-all cursor-pointer" />
                <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 bg-secondary shadow-md border-none opacity-0 group-hover:opacity-100 group-hover:right-4 transition-all cursor-pointer" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex-1">
          <Price activeVariant={activeVariant} />
          <p className="text-2xl my-3">
            {isVi ? product?.name?.vi : product?.name?.en}
          </p>

          <p className="text-muted">
            {isVi
              ? parse(product?.description?.vi)
              : parse(product?.description?.en)}
          </p>

          <div className="mt-3 mb-2 text-sm flex items-center flex-wrap gap-4 -ml-2">
            <p className="text-muted font-bold flex items-center">
              <DotIcon className="w-6 h-6" /> {t("stock")}:
            </p>
            <p>{activeVariant.stock}</p>
          </div>

          <div className="mb-2 flex items-center flex-wrap gap-4 -ml-2">
            <p className="text-muted font-bold text-sm flex items-center">
              <DotIcon className="w-6 h-6" /> {t("scent")}:
            </p>
            <Variants
              {...{ product, activeVariantIndex, setActiveVariantIndex }}
            />
          </div>

          <Button
            variant="link"
            className="text-primary p-0 font-bold"
            onClick={goToProductPage}
          >
            {t("go_to_product")}
            <SquareArrowOutUpRightIcon className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickView;
