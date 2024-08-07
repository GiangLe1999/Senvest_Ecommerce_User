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

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import CountdownTimer from "./countdown-timer";
import CustomLoadingButton from "@/components/custom-loading-button";
import { resendOtp, verifyAccount } from "@/actions/authentication";

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
      message: "Mã xác thực phải có đủ 6 ký tự.",
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
        toast.success("Xác thực tài khoản thành công", {
          description: <p>Chào mừng bạn đến với Kindle Hope Candles.</p>,
        });

        let params = new URLSearchParams(document.location.search);
        const redirectURL = params.get("next") ?? "/";
        router.replace(redirectURL);
      } else {
        setLoading(false);
        return toast.error(res.error, {
          description: "Vui lòng kiểm tra lại thông tin xác thực.",
        });
      }
    } catch (error) {
      setLoading(false);
      return toast.error("Xác thực tài khoản thất bại", {
        description: "Chúng tôi sẽ khắc phục trong thời gian sớm nhất.",
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
        toast.success("Gửi lại mã xác thực thành công", {
          description: <p>Vui lòng nhập mã xác thực để xác thực tài khoản.</p>,
        });
        setCount(60);
      } else {
        setResendLoading(false);
        return toast.error(res.error, {
          description: "Vui lòng kiểm tra lại thông tin tài khoản.",
        });
      }
    } catch (error) {
      setResendLoading(false);
      return toast.error("Xác thực tài khoản thất bại", {
        description: "Chúng tôi sẽ khắc phục trong thời gian sớm nhất.",
      });
    }
  }

  return (
    <div className="bg-white pt-10 pb-6 px-6 border shadow-md rounded-sm">
      <div className="text-center text-sm">
        <h1 className="font-bold text-3xl text-primary mb-4">
          {t("heading_2")}
        </h1>

        <p className="text-muted mb-2">
          One Time Password (OTP) has been sent via Email to:{" "}
        </p>
        <strong>{email}</strong>
        <p className="text-muted mt-6">Enter the OTP below to verify it</p>
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
                      Resend OTP
                    </Button>
                  ) : (
                    <p>
                      Resend OTP in:{" "}
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
            content="Xác nhận"
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
