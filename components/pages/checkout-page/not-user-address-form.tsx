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
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { nameRegex } from "@/data/regexes";
import { provinces } from "@/data/provinces";
import { Button } from "@/components/ui/button";
import { ChevronsRightIcon } from "lucide-react";
import { NotUserInfo } from "@/entities/not-user-info-entity";

interface Props {
  setNotUserInfo: Dispatch<SetStateAction<NotUserInfo | undefined>>;
  setContent: Dispatch<SetStateAction<"adddress" | "payment">>;
}

const NotUserAddressForm: FC<Props> = ({
  setNotUserInfo,
  setContent,
}): JSX.Element => {
  const t = useTranslations("add_address_page");

  const locale = useLocale();

  const FormSchema = z.object({
    name: z.string().regex(nameRegex, {
      message: t("name_rule"),
    }),
    email: z.string().email({
      message: t("email_rule"),
    }),
    address: z.string().min(1, {
      message: t("address_rule"),
    }),
    city: z.string().min(1, {
      message: t("city_rule"),
    }),
    province: z.string().min(1, {
      message: t("province_rule"),
    }),
    zip: z.string().min(1, {
      message: t("zip_rule"),
    }),
    phone: z.string().min(1, {
      message: t("phone_rule"),
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      province: "",
      zip: "",
      phone: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setNotUserInfo(data);
    setContent("payment");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-6">
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  {t("name")}
                  <span className="text-destructive"> *</span>
                </FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input placeholder={t("name")} {...field} />
                  </FormControl>
                  {form.formState.errors.name ? (
                    <FormMessage />
                  ) : (
                    <FormDescription className="text-xs">
                      {t("name_rule")}
                    </FormDescription>
                  )}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Email</FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  {form.formState.errors.email ? (
                    <FormMessage />
                  ) : (
                    <FormDescription className="text-xs mt-1">
                      {t("email_desc")}
                    </FormDescription>
                  )}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  {t("address")}
                  <span className="text-destructive"> *</span>
                </FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  {form.formState.errors.address ? (
                    <FormMessage />
                  ) : (
                    <FormDescription className="text-xs">
                      {t("address_desc")}
                    </FormDescription>
                  )}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  {t("city")}
                  <span className="text-destructive"> *</span>
                </FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input placeholder={t("city")} {...field} />
                  </FormControl>
                  {form.formState.errors.city ? (
                    <FormMessage />
                  ) : (
                    <FormDescription className="text-xs">
                      {t("city_rule")}
                    </FormDescription>
                  )}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  {t("province")}
                  <span className="text-destructive"> *</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("province_desc")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province.value} value={province.value}>
                        {locale === "vi" ? province.viLabel : province.enLabel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.province ? (
                  <FormMessage />
                ) : (
                  <FormDescription className="text-xs">
                    {t("province_rule")}
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  {t("zip")}
                  <span className="text-destructive"> *</span>
                </FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input placeholder={t("zip")} {...field} />
                  </FormControl>
                  {form.formState.errors.address ? (
                    <FormMessage />
                  ) : (
                    <FormDescription className="text-xs">
                      {t("zip_rule")}
                    </FormDescription>
                  )}
                </div>
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel className="font-bold">
              {t("country")}
              <span className="text-destructive"> *</span>
            </FormLabel>
            <Select disabled value="vietnam">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t("country_desc")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="vietnam">{t("vietnam")}</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>{t("country_desc")}</FormDescription>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  {t("phone")}
                  <span className="text-destructive"> *</span>
                </FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input placeholder={t("phone")} {...field} />
                  </FormControl>
                  {form.formState.errors.address ? (
                    <FormMessage />
                  ) : (
                    <FormDescription className="text-xs">
                      {t("phone_rule")}
                    </FormDescription>
                  )}
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="text-right">
          <Button type="submit">
            {t("continue")}
            <ChevronsRightIcon className="ml-1 mt-[2px] h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NotUserAddressForm;
