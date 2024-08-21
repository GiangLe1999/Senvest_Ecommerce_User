"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  deleteWishlistProduct,
  updateWishlistProduct,
} from "@/actions/user-wishlist.actions";
import Price from "@/components/product-card/price";
import { Wishlist } from "@/entities/wishlist.entity";
import {
  EditIcon,
  Loader2Icon,
  ShoppingCartIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { PriorityEnum } from "@/entities/wishlist-item.entity";
import { Input } from "@/components/ui/input";
import CustomLoadingButton from "@/components/custom-loading-button";
import { Button } from "@/components/ui/button";
import { Link } from "@/configs/i18n-navigation";
import { getChangedFields, getPriceForVariant } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";

interface Props {
  item: Wishlist["items"][0];
}

const FormSchema = z.object({
  quantity: z.string().min(1, {
    message: "Quantity must be greater than 0",
  }),
  priority: z.string(),
});

const WishlistItem: FC<Props> = ({ item }): JSX.Element => {
  const isVi = useLocale() === "vi";
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const t = useTranslations("account_wishlist_page");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const addMultipleToCartForWishlist = useCartStore(
    (state) => state.addMultipleToCartForWishlist
  );

  const addToCartHandler = () => {
    addMultipleToCartForWishlist(
      {
        _id: item._id._id,
        variant_id: item.variant_id._id,
        price: getPriceForVariant({
          price: item.variant_id.price,
          discountedPrice: item.variant_id?.discountedPrice,
          discountedFrom: item.variant_id?.discountedFrom,
          discountedTo: item.variant_id?.discountedTo,
        } as any),
        quantity: parseInt(form.watch("quantity")),
        image: item.variant_id.images[0],
        name: item._id.name,
        scent: item.variant_id.fragrance,
        stock: item.variant_id.stock,
        slug: item._id.slug,
        locale: isVi ? "vi" : "en",
      },
      parseInt(form.watch("quantity"))
    );
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const formattedInitialData = {
        quantity: item.quantity,
        priority: item.priority,
      };

      const formattedFormData = {
        quantity: parseInt(data.quantity),
        priority: data.priority,
      };

      const changedFields = getChangedFields({
        initialFormData: formattedInitialData,
        currentFormData: formattedFormData,
      });

      if (Object.keys(changedFields).length === 0) {
        return toast.error(t("no_change_fail"), {
          description: t("no_change_fail_desc"),
        });
      }

      setUpdateLoading(true);
      const res = await updateWishlistProduct({
        product_id: item._id._id,
        variant_id: item.variant_id._id,
        ...changedFields,
      });

      if (res.ok) {
        setUpdateLoading(false);
        toast.success(t("update_success"), {
          description: t("update_success_desc"),
        });
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
      setUpdateLoading(false);
      return toast.error(t("update_fail"), {
        description: t("update_fail_desc"),
      });
    }
  }

  const removeItemFromWishlist = async () => {
    try {
      setDeleteLoading(true);
      const res = await deleteWishlistProduct({
        product_id: item._id._id,
        variant_id: item.variant_id._id,
      });

      if (res.ok) {
        setDeleteLoading(false);
        toast.success(t("delete_success"), {
          description: t("delete_success_desc"),
        });
      }

      window.location.reload();
    } catch (error) {
      setDeleteLoading(false);
      return toast.error(t("delete_fail"), {
        description: t("delete_fail_desc"),
      });
    }
  };

  useEffect(() => {
    form.setValue("priority", item.priority || PriorityEnum.medium);
    form.setValue("quantity", item.quantity.toString());
  }, [item]);

  return (
    // href={`/san-pham/${isVi ? item._id.slug.vi : item._id.slug.en}` as any}
    <article className="rounded-sm transition custom-card-shadow relative">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger
            onClick={removeItemFromWishlist}
            className="absolute -top-2 -right-2 grid place-items-center bg-red-500 hover:bg-red-700 transition text-white w-5 h-5 rounded-full z-[10] leading-none text-xs"
          >
            {deleteLoading ? (
              <Loader2Icon className="w-3 h-3 animate-spin" />
            ) : (
              "X"
            )}
          </TooltipTrigger>
          <TooltipContent align="center" className="bg-black">
            <p>{t("remove")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Link
        href={`/product/${item._id.slug[isVi ? "vi" : "en"]}` as any}
        className="relative w-full aspect-square border-b rounded-t-sm block"
        target="_blank"
      >
        <Image
          className="rounded-sm"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          src={item.variant_id.images[0]}
          alt={
            isVi
              ? item._id.name.vi + " " + item.variant_id.fragrance
              : item._id.name.en + " " + item.variant_id.fragrance
          }
        />
      </Link>

      <div className="p-4 pb-5 text-sm">
        <h2 className="font-bold text-lg line-clamp-1 mb-2">
          <Link
            href={`/product/${item._id.slug[isVi ? "vi" : "en"]}` as any}
            target="_blank"
          >
            {item._id.name[isVi ? "vi" : "en"]}
          </Link>
        </h2>
        <p className="mb-1">
          <strong className="text-muted">{t("scent")}:</strong>{" "}
          {item.variant_id.fragrance}
        </p>
        <div className="flex items-baseline gap-2 mb-2">
          <strong className="text-muted">{t("price")}:</strong>{" "}
          <Price
            activeVariant={{
              price: item.variant_id.price,
              discountedPrice: item.variant_id.discountedPrice,
              stock: "0",
              fragrance: item.variant_id.fragrance,
              images: item.variant_id.images,
              discountedFrom: item.variant_id.discountedFrom,
              discountedTo: item.variant_id.discountedTo,
              _id: item.variant_id._id,
            }}
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-muted">
                    {t("quantity")}
                  </FormLabel>
                  <FormControl className="!mt-1">
                    <Input
                      className="h-10"
                      placeholder={t("quantity_desc")}
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  {form.formState.errors.quantity ? (
                    <FormMessage />
                  ) : (
                    <FormDescription className="text-xs !mt-1">
                      {t("quantity_desc")}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-muted">
                    {t("priority")}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="!mt-1">
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder={t("priority_desc")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={PriorityEnum.high}>
                        {t("high")}
                      </SelectItem>
                      <SelectItem value={PriorityEnum.medium}>
                        {t("medium")}
                      </SelectItem>
                      <SelectItem value={PriorityEnum.low}>
                        {t("low")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs !mt-1">
                    {t("priority_desc")}
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4 !my-4">
              <CustomLoadingButton
                loading={updateLoading}
                content={t("update")}
                type="submit"
                className="w-full hover:bg-emerald-600 bg-emerald-600"
                icon={<EditIcon className="w-4 h-4 mr-2" />}
              />

              <Link
                href={
                  `/san-pham/${
                    isVi ? item._id.slug.vi : item._id.slug.en
                  }` as any
                }
                target="_blank"
                className="w-full text-white bg-background flex items-center justify-center rounded-sm gap-2 px-4"
              >
                {t("view_product")}
                <SquareArrowOutUpRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </form>
        </Form>

        <Button
          className="w-full gap-2 hover:bg-primary"
          onClick={addToCartHandler}
        >
          <ShoppingCartIcon className="w-4 h-4" />
          {t("add_to_cart")}
        </Button>
      </div>
    </article>
  );
};

export default WishlistItem;
