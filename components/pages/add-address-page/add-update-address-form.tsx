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
import { FC, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import CustomLoadingButton from "@/components/custom-loading-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createUserAddress,
  updateUserAddress,
} from "@/actions/user-addresses.actions";
import { nameRegex } from "@/data/regexes";
import { provinces } from "@/data/provinces";
import { UserAddress } from "@/entities/user-address.entity";
import { getChangedFields } from "@/lib/utils";

interface Props {
  initialAddress?: UserAddress;
}

const AddUpdateAddressForm: FC<Props> = ({ initialAddress }) => {
  const t = useTranslations("add_address_page");
  const t2 = useTranslations("update_address_page");

  const isEdit = initialAddress ? true : false;

  const [loading, setLoading] = useState(false);
  const locale = useLocale();

  const FormSchema = z.object({
    alias: z.string().optional(),
    name: z.string().regex(nameRegex, {
      message: t("name_rule"),
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
      alias: initialAddress?.alias || "",
      name: initialAddress?.name || "",
      address: initialAddress?.address || "",
      city: initialAddress?.city || "",
      province: initialAddress?.province || "",
      zip: initialAddress?.zip || "",
      phone: initialAddress?.phone || "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (isEdit && initialAddress) {
        const changedFields = getChangedFields({
          initialFormData: initialAddress,
          currentFormData: data,
        });

        if (Object.keys(changedFields).length === 0) {
          return toast.error(t2("no_changes"), {
            description: t2("no_changes_desc"),
          });
        }

        setLoading(true);
        const res = await updateUserAddress({
          _id: initialAddress._id,
          ...changedFields,
        });
        if (res.ok) {
          setLoading(false);
          toast.success(t2("success"), {
            description: t2("success_desc"),
          });
          window.location.href = `/${locale}/tai-khoan/dia-chi`;
        } else {
          setLoading(false);
          return toast.error(t2("fail_1"), {
            description: t2("fail_1_desc"),
          });
        }
      } else {
        setLoading(true);
        const res = await createUserAddress(data);
        if (res.ok) {
          setLoading(false);
          toast.success(t("success"), {
            description: `${t("success_desc")}.`,
          });

          window.location.href = `/${locale}/tai-khoan/dia-chi`;
        } else {
          setLoading(false);
          return toast.error(t("fail_1"), {
            description: t("fail_1_desc"),
          });
        }
      }
    } catch (error) {
      setLoading(false);
      return toast.error(t("fail_2"), {
        description: t("fail_2_desc"),
      });
    }
  }

  return (
    <div className="bg-white pt-10 pb-6 px-6 border shadow-md rounded-sm">
      <h1 className="font-bold text-3xl text-primary mb-4">
        {isEdit ? t2("heading") : t("heading")}
      </h1>

      <p className="mb-8">{t("description")}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-x-10 gap-y-8">
            <FormField
              control={form.control}
              name="alias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">{t("alias")}</FormLabel>
                  <div className="flex-1">
                    <FormControl>
                      <Input placeholder="Optional" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      {t("optional_field")}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

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
                          {locale === "vi"
                            ? province.viLabel
                            : province.enLabel}
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

          <CustomLoadingButton
            loading={loading}
            content={t("save")}
            type="submit"
            size="lg"
            className="text-lg w-full !mt-8 h-12"
          />
        </form>
      </Form>
    </div>
  );
};

export default AddUpdateAddressForm;
