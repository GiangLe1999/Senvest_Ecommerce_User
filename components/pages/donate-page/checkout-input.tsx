"use client";

import { useForm } from "react-hook-form";
import { FC } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { donateChoices } from "./donate-form";
import CurrencySelect from "./currency-select";

interface Props {
  setSelectedCurrency: Dispatch<SetStateAction<"VND" | "USD">>;
  selectedCurrency: "VND" | "USD";
  enteredAmount: number;
  setEnteredAmount: Dispatch<SetStateAction<number>>;
  invalidAmount: boolean;
  setInvalidAmount: Dispatch<SetStateAction<boolean>>;
}

const CheckoutInput: FC<Props> = ({
  setSelectedCurrency,
  selectedCurrency,
  enteredAmount,
  setEnteredAmount,
  invalidAmount,
  setInvalidAmount,
}) => {
  const form = useForm();
  const t = useTranslations("checkout_block");
  return (
    <Form {...form}>
      <form className="mt-5">
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
                    const numeralValue = e.target.value.replace(/[^0-9.]/g, "");
                    const formattedValue = parseInt(numeralValue) || 0;
                    form.setValue("amount", formattedValue);
                    setEnteredAmount(formattedValue);
                    if (selectedCurrency === "VND") {
                      if (
                        formattedValue <
                        Number(process.env.NEXT_PUBLIC_VND_MIN_AMOUNT as string)
                      ) {
                        setInvalidAmount(true);
                      } else {
                        setInvalidAmount(false);
                      }
                    } else if (selectedCurrency === "USD") {
                      if (
                        formattedValue <
                        Number(process.env.NEXT_PUBLIC_USD_MIN_AMOUNT as string)
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
      </form>
    </Form>
  );
};

export default CheckoutInput;
