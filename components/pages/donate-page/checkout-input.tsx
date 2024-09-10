"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { FC, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { cn, formatCurrencyVND } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { donateChoices } from "./donate-form";
import CurrencySelect from "./currency-select";
import CommentInput from "./comment-input";
import { getAmountInVND } from "@/lib/get-amount-in-vnd";
import { createDonationLink } from "@/actions/donation.actions";
import { toast } from "sonner";
import { nameRegex } from "@/data/regexes";
import CustomLoadingButton from "@/components/custom-loading-button";

interface Props {
  setSelectedCurrency: Dispatch<SetStateAction<"VND" | "USD">>;
  selectedCurrency: "VND" | "USD";
  enteredAmount: number;
  setEnteredAmount: Dispatch<SetStateAction<number>>;
  invalidAmount: boolean;
  setInvalidAmount: Dispatch<SetStateAction<boolean>>;
  comment: { show: boolean; msg: string };
  setComment: Dispatch<SetStateAction<{ show: boolean; msg: string }>>;
}

const CheckoutInput: FC<Props> = ({
  setSelectedCurrency,
  selectedCurrency,
  enteredAmount,
  setEnteredAmount,
  invalidAmount,
  setInvalidAmount,
  comment,
  setComment,
}) => {
  const t = useTranslations("donate_page");
  const locale = useLocale();

  const formSchema = z.object({
    amount: z.any(),
    name: z.string({ message: t("name_rule_1") }).regex(nameRegex, {
      message: t("name_rule_2"),
    }),
    email: z
      .string({ message: t("email_rule_1") })
      .email({ message: t("email_rule_2") }),
    phone: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(enteredAmount);
    const minimumAmount =
      selectedCurrency === "VND" ? 1000 : selectedCurrency === "USD" ? 1 : 0;

    if (enteredAmount < minimumAmount) {
      setInvalidAmount(true);
      return;
    } else {
      setInvalidAmount(false);
    }

    let donateAmount: any = enteredAmount;
    setLoading(true);

    if (selectedCurrency === "USD") {
      donateAmount = await getAmountInVND(enteredAmount);
    }

    try {
      const res = await createDonationLink({
        amount: donateAmount,
        description: `Dong gop ${formatCurrencyVND(donateAmount)}`,
        cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/${
          locale === "vi" ? "huy-dong-gop" : "cancel-donation"
        }`,
        returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/${
          locale === "vi" ? "cam-on-da-dong-gop" : "thank-you-for-your-donation"
        }`,
        email: values.email,
        name: values.name,
        ...(values?.phone && {
          phone: values.phone,
        }),
        ...(comment.msg && {
          comment: comment.msg,
        }),
      });
      if (res.ok) {
        setLoading(false);
        window.location.href = res.data.checkoutUrl;
      } else {
        setLoading(false);
        return toast.error(t("create_link_fail"), {
          description: res.error,
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error(t("create_link_fail"), {
        description: t("please_try_again"),
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 mt-5 flex flex-col justify-between"
      >
        <div>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="relative">
                <span className="absolute left-3 top-3 z-10 text-xl">
                  {donateChoices[selectedCurrency]?.symbol}
                </span>
                <FormControl>
                  <Input
                    type="text"
                    className={cn(
                      "pl-7 bg-white relative text-3xl text-primary h-[52px] border-2",
                      invalidAmount && "border-red-500"
                    )}
                    {...field}
                    value={enteredAmount.toLocaleString("en-US", {
                      style: "decimal",
                      maximumFractionDigits: 0,
                    })}
                    onChange={(e) => {
                      const numeralValue = e.target.value.replace(
                        /[^0-9.]/g,
                        ""
                      );
                      const formattedValue = parseInt(numeralValue) || 0;
                      form.setValue("amount", formattedValue);
                      setEnteredAmount(formattedValue);
                      if (selectedCurrency === "VND") {
                        if (
                          formattedValue <
                          Number(
                            process.env.NEXT_PUBLIC_VND_MIN_AMOUNT as string
                          )
                        ) {
                          setInvalidAmount(true);
                        } else {
                          setInvalidAmount(false);
                        }
                      } else if (selectedCurrency === "USD") {
                        if (
                          formattedValue <
                          Number(
                            process.env.NEXT_PUBLIC_USD_MIN_AMOUNT as string
                          )
                        ) {
                          setInvalidAmount(true);
                        } else {
                          setInvalidAmount(false);
                        }
                      }
                    }}
                  />
                </FormControl>
                {invalidAmount && (
                  <FormMessage>{t("minimum_amount")}</FormMessage>
                )}
                <div className="absolute -top-[2px] right-1">
                  <CurrencySelect
                    setSelectedCurrency={setSelectedCurrency}
                    selectedCurrency={selectedCurrency}
                  />
                </div>
              </FormItem>
            )}
          />

          <div className="mt-4 space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">{t("name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("name")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">{t("phone")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("phone_optional")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <CommentInput comment={comment} setComment={setComment} />
        </div>

        <CustomLoadingButton
          loading={loading}
          type="submit"
          className="w-full mt-10 text-lg h-12"
          content={t("heading")}
        />
      </form>
    </Form>
  );
};

export default CheckoutInput;
