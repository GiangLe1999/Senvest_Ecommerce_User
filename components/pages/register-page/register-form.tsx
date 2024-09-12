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
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@/configs/i18n-navigation";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { registerNewAccount } from "@/actions/authentication.actions";
import CustomLoadingButton from "@/components/custom-loading-button";
import { nameRegex } from "@/data/regexes";

interface Props {
  setActiveForm: Dispatch<SetStateAction<string>>;
  setCurrentEmail: Dispatch<SetStateAction<string>>;
}

const RegisterForm: FC<Props> = ({ setActiveForm, setCurrentEmail }) => {
  const t = useTranslations("register_page");
  const [loading, setLoading] = useState(false);

  const FormSchema = z.object({
    name: z.string().regex(nameRegex, {
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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const res = await registerNewAccount({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (res.ok) {
        setLoading(false);
        toast.success(t("success"), {
          description: t("success_desc"),
        });
        setCurrentEmail(data.email);
        setActiveForm("verification");
      } else {
        setLoading(false);
        return toast.error(t("fail_1"), {
          description: t("fail_1_desc"),
        });
      }
    } catch (error) {
      setLoading(false);
      return toast.error(t("fail_2"), {
        description: t("fail_2_desc"),
      });
    }
  }

  function onGoogleSignIn() {
    let params = new URLSearchParams(document.location.search);
    const redirectURL = params.get("next") ?? "/";

    signIn("google", {
      callbackUrl: redirectURL,
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
                    <Input
                      type="password"
                      placeholder="johndoeXYZ@"
                      {...field}
                    />
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

          <CustomLoadingButton
            loading={loading}
            content={t("submit")}
            type="submit"
            size="lg"
            className="text-lg w-full !mt-8 h-12"
          />

          <div className="text-sm flex items-center gap-1 sm:justify-end justify-start flex-wrap">
            <span className="text-muted">{t("already_have_an_account")}</span>
            <Link
              href="/dang-nhap"
              className="font-semibold hover:text-primary hover:underline transition"
            >
              {t("sign_in")}
            </Link>
            <span className="text-muted">{t("or")}</span>
            <Link
              href="/quen-mat-khau"
              className="font-semibold hover:text-primary hover:underline transition"
            >
              {t("forgot_password")}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Separator className="w-[45%]" />
            <span className="flex-1 text-center capitalize">{t("or")}</span>
            <Separator className="w-[45%]" />
          </div>

          <Button
            size="lg"
            className="text-lg w-full h-12 bg-[#4F86EC] hover:bg-[#4F86EC]/90 pl-1 py-[3px]"
            onClick={onGoogleSignIn}
            type="button"
          >
            <div className="h-full aspect-square grid place-items-center bg-white rounded-sm">
              <Image
                src="/icons/google-logo.png"
                width={20}
                height={20}
                alt="Google logo"
              />
            </div>
            <span className="flex-1">{t("gg_register")}</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
