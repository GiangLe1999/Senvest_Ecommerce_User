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
import { forgotPassword } from "@/actions/authentication";

interface Props {}

const ForgotPasswordForm: FC<Props> = () => {
  const t = useTranslations("forgot_password_page");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  const FormSchema = z.object({
    email: z.string().email({
      message: t("email_rule"),
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const res = await forgotPassword({
        email: data.email,
        locale: locale ? locale : "vi",
      });

      if (res.ok) {
        setLoading(false);
        toast.success(t("success"), {
          description: `${t("success_desc")} ${data.email}.`,
        });
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

  return (
    <div className="bg-white pt-10 pb-6 px-6 border shadow-md rounded-sm">
      <h1 className="font-bold text-3xl text-center text-primary mb-6">
        {t("heading")}
      </h1>

      <p className="text-center max-w-[70%] mx-auto mb-8">{t("description")}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">{t("email")}</FormLabel>
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

          <CustomLoadingButton
            loading={loading}
            content={t("continue")}
            type="submit"
            size="lg"
            className="text-lg w-full !mt-8 h-12"
          />
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
