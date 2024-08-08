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
import { useRouter } from "@/configs/i18n-navigation";
import { useTranslations } from "next-intl";
import CustomLoadingButton from "@/components/custom-loading-button";
import { resetPassword } from "@/actions/authentication";

interface Props {
  token: string;
}

const ResetPasswordForm: FC<Props> = ({ token }) => {
  const t = useTranslations("reset_password_page");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const FormSchema = z
    .object({
      password: z
        .string()
        .min(6, {
          message: t("password_rule_1"),
        })
        .regex(/[^A-Za-z0-9]/, {
          message: t("password_rule_2"),
        }),
      confirm_password: z
        .string()
        .min(6, {
          message: t("password_rule_1"),
        })
        .regex(/[^A-Za-z0-9]/, {
          message: t("password_rule_2"),
        }),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: t("confirm_password_desc"),
      path: ["confirm_password"],
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const res = await resetPassword({ token, password: data.password });

      if (res.ok) {
        setLoading(false);
        toast.success(t("success"), {
          description: t("success_desc"),
        });

        router.replace("/dang-nhap");
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">{t("new_password")}</FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input placeholder={t("new_password")} {...field} />
                  </FormControl>
                  {form.formState.errors.password ? (
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
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  {t("confirm_password")}
                </FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input placeholder={t("re_enter_password")} {...field} />
                  </FormControl>
                  {form.formState.errors.confirm_password ? (
                    <FormMessage />
                  ) : (
                    <FormDescription className="text-xs mt-1">
                      {t("confirm_password_desc")}
                    </FormDescription>
                  )}
                </div>
              </FormItem>
            )}
          />

          <CustomLoadingButton
            loading={loading}
            content={t("breadcrumb")}
            type="submit"
            size="lg"
            className="text-lg w-full !mt-8 h-12"
          />
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
