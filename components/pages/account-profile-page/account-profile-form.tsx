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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GenderEnum, User } from "@/entities/user.entity";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn, getChangedFields } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { updateUserProfile } from "@/actions/user.actions";
import { vi, enUS } from "date-fns/locale";
import { nameRegex } from "@/data/regexes";

interface Props {
  userProfile: User;
}

const AccountProfileForm: FC<Props> = ({ userProfile }) => {
  const t = useTranslations("account_profile_page");
  const [loading, setLoading] = useState(false);
  const locale = useLocale();

  const FormSchema = z
    .object({
      name: z.string().regex(nameRegex, {
        message: t("name_rule"),
      }),
      gender: z.enum(["male", "female"]),
      current_password: z.string().optional(),
      new_password: z.string().optional(),
      date_of_birth: z.date().optional(),
      terms: z.boolean().refine((val) => val === true),
      data_privacy: z.boolean().refine((val) => val === true),
      receive_offers: z.boolean().optional(),
    })
    .refine(
      (data) => {
        if (
          (data.current_password && !data.new_password) ||
          (!data.current_password && data.new_password)
        ) {
          return false;
        }
        return true;
      },
      {
        message: t("both_passwords_required"),
        path: ["current_password"], // or ["current_password"], you can choose where the error appears
      }
    )
    .refine(
      (data) => {
        if (data.current_password && data.new_password) {
          const isValidPassword = (password: any) =>
            password.length >= 6 && /[^A-Za-z0-9]/.test(password);
          return (
            isValidPassword(data.current_password) &&
            isValidPassword(data.new_password)
          );
        }
        return true;
      },
      {
        message: t("password_rule"),
        path: ["new_password"], // or ["current_password"], you can choose where the error appears
      }
    );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: userProfile.name || "",
      gender: userProfile.gender || GenderEnum.male,
      current_password: "",
      new_password: "",
      date_of_birth: userProfile?.date_of_birth || undefined,
      terms: false,
      data_privacy: false,
      receive_offers: userProfile.receive_offers || false,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const formattedInitialData = {
        name: userProfile.name,
        ...(userProfile?.date_of_birth && {
          date_of_birth: userProfile.date_of_birth.toISOString(),
        }),
        receive_offers: userProfile.receive_offers,
        gender: userProfile.gender,
      };

      const formattedFormData = {
        name: data.name,
        ...(data?.date_of_birth && {
          date_of_birth: data.date_of_birth.toISOString(),
        }),
        ...(data.current_password && {
          current_password: data.current_password,
        }),
        ...(data.new_password && { new_password: data.new_password }),
        receive_offers: data.receive_offers,
        gender: data.gender,
      };

      const changedFields = getChangedFields({
        initialFormData: formattedInitialData,
        currentFormData: formattedFormData,
      });

      if (Object.keys(changedFields).length === 0) {
        return toast.error(t("fail_1"), {
          description: t("fail_1_desc"),
        });
      }

      setLoading(true);
      const res = await updateUserProfile(changedFields);
      if (res.ok) {
        setLoading(false);
        toast.success(t("success"), {
          description: `${t("success_desc")}.`,
        });

        window.location.reload();
      } else {
        setLoading(false);
        return toast.error(t("fail_2"), {
          description: t("fail_2_desc"),
        });
      }
    } catch (error) {
      setLoading(false);
      return toast.error(t("fail_3"), {
        description: t("fail_3_desc"),
      });
    }
  }

  return (
    <div className="bg-white pt-10 pb-6 px-6 border shadow-md rounded-sm">
      <h1 className="font-bold text-3xl text-primary mb-4">
        {t("breadcrumb_2")}
      </h1>

      <p className="mb-8">{t("description")}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-10">
            <FormItem>
              <FormLabel className="font-bold">{t("email")}</FormLabel>
              <div className="flex-1">
                <FormControl>
                  <Input
                    placeholder="johndoe@hotmail.com"
                    readOnly
                    disabled
                    value={userProfile.email}
                  />
                </FormControl>

                <FormDescription className="text-xs mt-1">
                  {t("email_desc")}
                </FormDescription>
              </div>
            </FormItem>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold"> {t("name")}</FormLabel>
                  <div className="flex-1">
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
              name="current_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    {t("current_password")}
                  </FormLabel>
                  <div className="flex-1">
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="johndoeXYZ@"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.current_password ? (
                      <FormMessage />
                    ) : (
                      <FormDescription className="text-xs mt-1">
                        {t("current_password_desc")}
                      </FormDescription>
                    )}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    {t("new_password")}
                  </FormLabel>
                  <div className="flex-1">
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="johndoeXYZ@"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.new_password ? (
                      <FormMessage />
                    ) : (
                      <FormDescription className="text-xs mt-1">
                        {t("new_password_desc")}
                      </FormDescription>
                    )}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-bold">
                    {t("date_of_birth")}
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          className={cn(
                            "h-12 w-full rounded-sm bg-secondary hover:bg-secondary px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            <span className="text-foreground capitalize">
                              {format(field.value, "PPP", {
                                locale: locale === "en" ? enUS : vi,
                              })}
                            </span>
                          ) : (
                            <span>{t("pick_date")}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 text-muted" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        locale={locale === "en" ? enUS : vi}
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        captionLayout="dropdown-buttons"
                        fromYear={1960}
                        toYear={2030}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>{t("optional_field")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Social title:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={GenderEnum.male} />
                        </FormControl>
                        <FormLabel className="cursor-pointer">Mr.</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={GenderEnum.female} />
                        </FormControl>
                        <FormLabel className="cursor-pointer">Mrs.</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-5">
              <FormField
                control={form.control}
                name="receive_offers"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">
                        {t("receive_offers")}{" "}
                      </FormLabel>
                      <FormDescription>
                        {t("receive_offers_desc")}
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="data_privacy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">
                        {t("customer_data_privacy")}{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormDescription>
                        {t("customer_data_privacy_desc")}
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">
                        {t("terms")} <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormDescription>{t("terms_desc")}</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
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

export default AccountProfileForm;
