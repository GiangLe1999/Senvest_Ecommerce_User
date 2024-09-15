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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useTranslations } from "next-intl";
import { getCoupon } from "@/queries/coupons.queries";
import CustomLoadingButton from "@/components/custom-loading-button";
import { formatCurrencyVND } from "@/lib/utils";

interface Props {
  setDiscountedByCoupon: Dispatch<
    SetStateAction<{
      code: string;
      value: number;
    }>
  >;
  totalPrice: number;
}

const CouponInput: FC<Props> = ({
  setDiscountedByCoupon,
  totalPrice,
}): JSX.Element => {
  const t = useTranslations("cart");

  const [loading, setLoading] = useState(false);

  const FormSchema = z.object({
    coupon: z.string({ message: t("coupon_rule") }).min(1, {
      message: t("coupon_rule"),
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      coupon: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const res = await getCoupon(data.coupon);

      if (res.ok) {
        setLoading(false);

        const discount_type = res.coupon.discount_type;
        const discount_value = res.coupon.discount_value;

        const calculated_discount_value =
          discount_type === "Percent"
            ? (totalPrice * discount_value) / 100
            : discount_value;

        toast.success(
          `${t("apply_success")} ${
            discount_type === "Percent"
              ? discount_value + "%"
              : formatCurrencyVND(discount_value)
          }`,
          {
            description: `${t("apply_success_desc")} ${formatCurrencyVND(
              calculated_discount_value
            )}`,
          }
        );

        setDiscountedByCoupon({
          code: res.coupon.code,
          value: calculated_discount_value,
        });
      } else {
        setLoading(false);
        setDiscountedByCoupon({
          code: "",
          value: 0,
        });
        return toast.error(t("apply_fail"), {
          description: t("apply_fail_desc_1"),
        });
      }
    } catch (error) {
      setLoading(false);
      setDiscountedByCoupon({
        code: "",
        value: 0,
      });
      return toast.error(t("apply_fail"), {
        description: t("apply_fail_desc_2"),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="coupon"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold text-xs">
                  {t("coupon")}
                </FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Your coupon"
                      className="h-10 text-sm"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.coupon ? (
                    <FormMessage />
                  ) : (
                    <FormDescription className="text-xs">
                      {t("coupon_desc")}
                    </FormDescription>
                  )}
                </div>
              </FormItem>
            )}
          />

          <CustomLoadingButton
            content="Apply"
            loading={loading}
            type="submit"
            className="h-10 mt-1.5"
          />
        </div>
      </form>
    </Form>
  );
};

export default CouponInput;
