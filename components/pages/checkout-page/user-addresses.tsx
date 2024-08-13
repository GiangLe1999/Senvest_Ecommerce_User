"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Link } from "@/configs/i18n-navigation";
import { UserAddress } from "@/entities/user-address.entity";
import { ChevronsRightIcon, CirclePlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import NoAccountAddresses from "../account-addresses-page/no-account-addresses";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AccountAddress from "../account-addresses-page/account-address";

interface Props {
  userAdddresses: UserAddress[] | null;
  locale: string;
}

const UserAddresses: FC<Props> = ({ userAdddresses, locale }): JSX.Element => {
  const t = useTranslations("account_addresses_page");

  const FormSchema = z.object({
    address_id: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address_id: userAdddresses?.[0]?._id,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {}

  return (
    <div className="mt-6">
      {userAdddresses && userAdddresses?.length > 0 ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="address_id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-x-6 gap-y-4"
                    >
                      {userAdddresses.map((address, index) => (
                        <FormItem
                          className="flex items-center relative"
                          key={address._id}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={address._id}
                              className="shrink-0 absolute top-6 right-4"
                            />
                          </FormControl>
                          <FormLabel className="leading-5">
                            <AccountAddress
                              address={address}
                              order={index + 1}
                              isChooseAddressPage
                              isChosen={address._id === field.value}
                            />
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center mt-5">
              <Link
                href={
                  `/tai-khoan/dia-chi/tao-moi?next=/${locale}/${
                    locale === "vi" ? "thanh-toan" : "checkout"
                  }` as any
                }
                className="flex items-center hover:text-primary transition-colors text-sm hover:underline"
              >
                <CirclePlusIcon className="w-4 h-4 mr-1" />
                {t("add_more_address")}
              </Link>

              <Button type="submit">
                {t("continue")}
                <ChevronsRightIcon className="ml-1 mt-[2px] h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <NoAccountAddresses />
      )}
    </div>
  );
};

export default UserAddresses;
