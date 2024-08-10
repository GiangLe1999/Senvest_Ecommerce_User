"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { toast } from "sonner";

import { useTranslations } from "next-intl";
import CountdownTimer from "./countdown-timer";
import CustomLoadingButton from "@/components/custom-loading-button";
import { resendOtp, verifyAccount } from "@/actions/authentication.actions";
import { useRouter } from "@/configs/i18n-navigation";

interface Props {
  email?: string;
}

const VerificationForm: FC<Props> = ({ email }): JSX.Element => {
  const [count, setCount] = useState(60);
  const canResendOtp = count === 0;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const t = useTranslations("register_page");
  const FormSchema = z.object({
    otp: z.string().min(6, {
      message: t("otp_rule"),
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(formValues: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      if (!email) {
        setLoading(false);
        return;
      }

      const res = await verifyAccount({
        email,
        otp: formValues.otp,
      });

      if (res.ok) {
        setLoading(false);
        toast.success(t("verify_success"), {
          description: t("verify_success_desc"),
        });

        router.replace("/dang-nhap");
      } else {
        setLoading(false);
        return toast.error(t("verify_fail_1"), {
          description: t("verify_fail_1_desc"),
        });
      }
    } catch (error) {
      setLoading(false);
      return toast.error(t("verify_fail_2"), {
        description: t("verify_fail_2_desc"),
      });
    }
  }

  async function resend() {
    try {
      setResendLoading(true);

      if (!email) {
        setResendLoading(false);
        return;
      }

      const res = await resendOtp({
        email,
      });

      console.log(res);

      if (res.ok) {
        setResendLoading(false);
        toast.success(t("resend_otp_success"), {
          description: t("resend_otp_success_desc"),
        });
        setCount(60);
      } else {
        setResendLoading(false);
        return toast.error(t("resend_otp_fail_1"), {
          description: t("resend_otp_fail_1_desc"),
        });
      }
    } catch (error) {
      setResendLoading(false);
      return toast.error(t("resend_otp_fail_1"), {
        description: t("resend_otp_fail_1_desc"),
      });
    }
  }

  return (
    <div className="bg-white pt-10 pb-6 px-6 border shadow-md rounded-sm">
      <div className="text-center text-sm">
        <h1 className="font-bold text-3xl text-primary mb-4">
          {t("heading_2")}
        </h1>

        <p className="text-muted mb-2">{t("resend_otp_first_line")} </p>
        <strong>{email}</strong>
        <p className="text-muted mt-6">{t("resend_otp_second_line")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="text-center">
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="mx-auto">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  {canResendOtp ? (
                    <Button
                      variant="link"
                      className="underline hover:text-primary/70 transition-colors"
                      onClick={resend}
                      disabled={resendLoading}
                    >
                      {t("resend_otp")}
                    </Button>
                  ) : (
                    <p>
                      {t("resend_otp_in")}{" "}
                      <CountdownTimer count={count} setCount={setCount} />
                    </p>
                  )}
                </FormDescription>
                <FormMessage />
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
        </form>
      </Form>
    </div>
  );
};

export default VerificationForm;
