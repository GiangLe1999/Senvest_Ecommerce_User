"use client";

import { FC, useEffect, useState } from "react";
import SecureDonation from "./secure-donation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CheckoutInput from "./checkout-input";
import { useTranslations } from "next-intl";

interface Props {}

export const donateChoices = {
  VND: {
    choices: [
      { label: "₫ 5M", value: 5000000 },
      { label: "₫ 2.5M", value: 2500000 },
      { label: "₫ 1.2M", value: 1200000 },
      { label: "₫ 500K", value: 500000 },
      { label: "₫ 250K", value: 250000 },
      { label: "₫ 120K", value: 120000 },
    ],
    symbol: "₫",
  },
  USD: {
    choices: [
      { label: "$ 250", value: 250 },
      { label: "$ 120", value: 120 },
      { label: "$ 55", value: 55 },
      { label: "$ 20", value: 20 },
      { label: "$ 10", value: 10 },
      { label: "$ 5", value: 5 },
    ],
    symbol: "$",
  },
};

const intialVNDValue = donateChoices.VND.choices[4].value;
const intialUSDValue = donateChoices.USD.choices[4].value;

const DonateForm: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("donate_page");
  const [selectedCurrency, setSelectedCurrency] = useState<"VND" | "USD">(
    "VND"
  );
  const [enteredAmount, setEnteredAmount] = useState(intialVNDValue);
  const [comment, setComment] = useState({
    show: false,
    msg: "",
  });
  const [invalidAmount, setInvalidAmount] = useState(false);

  useEffect(() => {
    if (selectedCurrency == "VND") {
      setEnteredAmount(intialVNDValue);
    } else setEnteredAmount(intialUSDValue);
  }, [selectedCurrency]);

  return (
    <div className="px-6 py-7 h-full">
      <div className="h-full flex flex-col">
        <h1 className="text-2xl font-semibold leading-none tracking-tight flex items-center justify-center gap-x-2">
          <SecureDonation className="text-primary" />
          {t("secure_donation")}
        </h1>
        <p className="text-sm text-muted-foreground text-center mt-2">
          {t("secure_donation_sub")}
        </p>

        <div className="mt-6 flex-1 flex flex-col">
          <div className="grid grid-cols-3 gap-3">
            {donateChoices[selectedCurrency as "USD" | "VND"]?.choices?.map(
              (choice) => (
                <Button
                  variant="outline"
                  key={choice.value}
                  className={cn(
                    "font-normal text-base text-foreground w-full border-2 border-[#dedfe0] rounded-sm bg-white hover:bg-[#f4f4f4] hover:text-text-foreground transition",
                    choice.value === enteredAmount &&
                      "border-primary !text-primary bg-primary/10"
                  )}
                  onClick={() => setEnteredAmount(choice.value)}
                >
                  {choice.label}
                </Button>
              )
            )}
          </div>

          <CheckoutInput
            setSelectedCurrency={setSelectedCurrency}
            selectedCurrency={selectedCurrency}
            enteredAmount={enteredAmount}
            setEnteredAmount={setEnteredAmount}
            invalidAmount={invalidAmount}
            setInvalidAmount={setInvalidAmount}
            comment={comment}
            setComment={setComment}
          />
        </div>
      </div>
    </div>
  );
};

export default DonateForm;
