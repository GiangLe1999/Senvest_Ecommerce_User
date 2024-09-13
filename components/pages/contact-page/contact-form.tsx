"use client";

import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomLoadingButton from "@/components/custom-loading-button";
import { Session } from "next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { nameRegex } from "@/data/regexes";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Payment } from "@/entities/payment.entity";
import { createContact } from "@/actions/contact.actions";

interface Props {
  session: Session | null;
  payments: Payment[] | null;
}

const ContactForm: FC<Props> = ({ session, payments }): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const t = useTranslations("contact_page");

  const FormSchema = z.object({
    name: z.string({ message: t("name_rule") }).regex(nameRegex, {
      message: t("name_invalid"),
    }),
    email: z.string({ message: t("email_rule") }).email({
      message: t("email_invalid"),
    }),
    phone: z.string().optional(),
    subject: z.string(),
    message: z.string().min(1, {
      message: t("message_rule"),
    }),
    payment_id: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: session ? session.user.name : "",
      email: session ? session.user.email : "",
      phone: "",
      message: "",
      subject: "Customer Service",
      payment_id: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const res = await createContact({
        email: data.email,
        name: data.name,
        ...(data?.phone && { phone: data.phone }),
        ...(data?.payment_id && { payment_id: data.payment_id }),
        subject: data.subject,
        message: data.message,
      });
      if (res.ok) {
        setLoading(false);
        form.reset();
        toast.success(t("success"), {
          description: t("success_desc"),
        });
      } else {
        console.log(res);
        setLoading(false);
        return toast.error(t("fail"), {
          description: t("fail_desc"),
        });
      }
    } catch (error) {
      setLoading(false);
      return toast.error(t("fail"), {
        description: t("fail_desc"),
      });
    }
  }

  useEffect(() => {
    if (session) {
      form.setValue("name", session.user.name);
      form.setValue("email", session.user.email);
    }
  }, [session]);

  return (
    <div className="rounded-sm border shadow-md px-6 py-4 mt-4">
      <h2 className="text-2xl font-bold capitalize">{t("heading_2")}</h2>
      <p className="text-sm text-muted mt-1">{t("desc_2")}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-5">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-4 gap-x-5">
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
                      <Input
                        placeholder="John Doe"
                        className="h-11"
                        {...field}
                      />
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
                  <FormLabel className="font-bold">
                    Email
                    <span className="text-destructive"> *</span>
                  </FormLabel>
                  <div className="flex-1">
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder={t("email_rule")}
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.email ? (
                      <FormMessage />
                    ) : (
                      <FormDescription className="text-xs mt-1">
                        {t("email_rule")}
                      </FormDescription>
                    )}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">{t("phone")}</FormLabel>
                  <div className="flex-1">
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder={t("phone")}
                        {...field}
                      />
                    </FormControl>

                    <FormDescription className="text-xs">
                      {t("phone_desc")}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    {t("subject")}
                    <span className="text-destructive"> *</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Customer Service">
                        {t("customer_service")}
                      </SelectItem>
                      <SelectItem value="Webmaster">
                        {t("webmaster")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs !mt-1">
                    {t("subject_desc")}
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          {payments && payments.length > 0 && (
            <FormField
              control={form.control}
              name="payment_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">{t("order_ref")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        {form.watch("payment_id") ? (
                          <SelectValue />
                        ) : (
                          t("order_ref_placeholder")
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {payments.map((payment) => (
                        <SelectItem key={payment._id} value={payment._id}>
                          {payment.orderCode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs !mt-1">
                    {t("order_ref_desc")}
                  </FormDescription>
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  {t("message")}
                  <span className="text-destructive"> *</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("message_rule")}
                    className="resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.message ? (
                  <FormMessage />
                ) : (
                  <FormDescription className="text-xs">
                    {t("message_rule")}
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          <div className="text-right">
            <CustomLoadingButton
              loading={loading}
              content="Submit"
              type="submit"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
