"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MailPlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomLoadingButton from "@/components/custom-loading-button";
import { createSubscriber } from "@/actions/subscriber.actions";

interface Props {}

const Subscribe: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("footer");
  const [loading, setLoading] = useState(false);

  const FormSchema = z.object({
    email: z.string().email({
      message: t("subscribe_rule"),
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
      const res = await createSubscriber(data.email);

      if (res.ok) {
        setLoading(false);
        toast.success(t("success"), {
          description: t("success_desc"),
        });
        return form.reset();
      } else {
        setLoading(false);
        return toast.error(t("fail"), {
          description: t("fail_desc_1"),
        });
      }
    } catch (error) {
      setLoading(false);
      return toast.error(t("fail"), {
        description: t("fail_2_desc"),
      });
    }
  }

  return (
    <div className="lg:py-[60px] py-[40px] flex flex-col gap-4 items-center border-b">
      <MailPlusIcon className="text-primary w-12 h-12" />
      <h3 className="lg:text-3xl text-2xl">{t("subscribe")}</h3>
      <h4 className="text-muted lg:text-base text-sm lg:text-left text-center">
        {t("subscribe_description")}
      </h4>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[700px] mx-auto w-full"
        >
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div>
                    <FormControl>
                      <Input
                        className="border border-[#c9c9c9]"
                        placeholder={t("email")}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <CustomLoadingButton
              loading={loading}
              content={t("subscribe")}
              type="submit"
              size="lg"
              className="h-12"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Subscribe;
