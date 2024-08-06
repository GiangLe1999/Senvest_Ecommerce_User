"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { FC } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@/configs/i18n-navigation";
import { useTranslations } from "next-intl";

interface Props {}

const RegisterForm: FC<Props> = () => {
  const t = useTranslations("register_page");

  const FormSchema = z.object({
    name: z.string().regex(/^[a-zA-Z. ]+$/, {
      message: t("name_rule"),
    }),
    email: z.string().email({
      message: t("email_rule"),
    }),
    password: z
      .string()
      .min(6, {
        message: t("password_rule_1"),
      })
      .regex(/[^A-Za-z0-9]/, {
        message: t("password_rule_2"),
      }),
    terms: z.boolean().refine((val) => val === true, {
      message: t("terms_rule"),
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          {JSON.stringify(data, null, 2)}
        </pre>
      ),
    });
  }

  return (
    <div className="bg-white pt-10 pb-6 px-6 border shadow-md rounded-sm">
      <h1 className="font-bold text-3xl text-center text-primary mb-10">
        {t("heading")}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold"> {t("email")}</FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input placeholder="johndoe@hotmail.com" {...field} />
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold"> {t("password")}</FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input placeholder="johndoeXYZ@" {...field} />
                  </FormControl>
                  {form.formState.errors.password ? (
                    <FormMessage />
                  ) : (
                    <FormDescription className="text-xs mt-1">
                      {t("password_desc")}
                    </FormDescription>
                  )}
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
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="text-lg w-full !mt-8 h-12">
            {t("submit")}
          </Button>

          <div className="text-sm flex items-center gap-1 justify-end">
            <span className="text-muted">{t("already_have_an_account")}</span>
            <Link
              href="/dang-nhap"
              className="font-semibold hover:text-primary hover:underline transition"
            >
              {t("sign_in")}
            </Link>
            <span className="text-muted">{t("or")}</span>
            <Link
              href="/dang-nhap"
              className="font-semibold hover:text-primary hover:underline transition"
            >
              {t("forgot_password")}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
