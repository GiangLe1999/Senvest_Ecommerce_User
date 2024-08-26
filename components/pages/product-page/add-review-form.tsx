"use client";

import { Separator } from "@/components/ui/separator";
import { LocalizedString } from "@/entities/common.entity";
import { Variant } from "@/entities/variant.entity";
import { useLocale } from "next-intl";
import { FC, useEffect, useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { nameRegex } from "@/data/regexes";
import { Rating } from "@/components/rating";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { createReview } from "@/actions/review.actions";
import { toast } from "sonner";
import CustomLoadingButton from "@/components/custom-loading-button";
import SuccessfulDialog from "@/components/successful-dialog";

interface Props {
  t: any;
  product_id: string;
  product_name: LocalizedString;
  variants: Variant[];
}

const AddReviewForm: FC<Props> = ({
  t,
  product_id,
  product_name,
  variants,
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [openSuccessfulDialog, setOpenSuccessfulDialog] = useState(false);
  const isVi = useLocale() === "vi";
  const { data: session } = useSession();

  const FormSchema = z.object({
    name: z.string().regex(nameRegex, {
      message: t("name_rule"),
    }),
    email: z.string().email({
      message: t("email_rule"),
    }),
    comment: z.string().min(1, {
      message: t("review_comment_rule"),
    }),
    variant: z.string({
      message: t("variant_rule"),
    }),
    rating: z
      .number()
      .min(1, {
        message: t("rating_rule"),
      })
      .max(5, {
        message: t("rating_rule"),
      }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      comment: "",
      variant: undefined,
      rating: 0,
    },
  });

  const changeRating = async (value: number) => {
    form.setValue("rating", value);
    if (isInitialized) {
      await form.trigger("rating");
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const res = await createReview({
        comment: data.comment,
        email: data.email,
        name: data.name,
        rating: data.rating,
        product_id,
        variant_id: data.variant,
      });
      if (res.ok) {
        setLoading(false);
        setOpenSuccessfulDialog(true);
        form.reset();
      } else {
        setLoading(false);
        return toast.error(t("create_review_fail_1"), {
          description: t("create_review_fail_1_desc"),
        });
      }
    } catch (error) {
      setLoading(false);
      return toast.error(t("create_review_fail_2"), {
        description: t("create_review_fail_2_desc"),
      });
    }
  }

  useEffect(() => {
    if (session) {
      form.setValue("name", session.user?.name || "");
      form.setValue("email", session.user?.email || "");
    }
  }, [session]);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  return (
    <>
      {" "}
      <div>
        <p className="text-2xl font-bold mb-2">
          {t("be_the_first")} “{isVi ? product_name.vi : product_name.en}”
        </p>

        <p>
          {t("review_note")} <span className="text-red-500 font-bold">*</span>
        </p>

        <Separator className="my-5" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex items-center gap-2">
              <FormLabel>
                <span
                  className={cn(
                    "font-bold",
                    form.formState.errors.rating && "text-destructive"
                  )}
                >
                  {t("your_rating")}
                </span>
                <span className="font-bold text-red-500"> *</span>
              </FormLabel>
              <Rating value={0} onChange={changeRating} />
            </div>
            {form.formState.errors.rating ? (
              <p className="text-destructive text-xs !mt-1">
                {form.formState.errors.rating.message}
              </p>
            ) : null}

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    {t("your_comment")}:
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("review_comment_desc")}
                      className="resize-none"
                      rows={8}
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.comment ? (
                    <FormMessage />
                  ) : (
                    <FormDescription className="text-xs">
                      {t("review_comment_rule")}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="variant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      {t("scent")}
                      <span className="text-destructive"> *</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          {field.value ? (
                            <SelectValue placeholder={t("scent_desc")} />
                          ) : (
                            t("scent_desc")
                          )}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {variants.map((variant) => (
                          <SelectItem key={variant._id} value={variant._id}>
                            {variant.fragrance}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.variant ? (
                      <FormMessage />
                    ) : (
                      <FormDescription className="text-xs">
                        {t("variant_rule")}
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      {t("reviewer_name")}
                      <span className="text-destructive"> *</span>
                    </FormLabel>
                    <div className="flex-1">
                      <FormControl>
                        <Input placeholder={t("reviewer_name")} {...field} />
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
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      {form.formState.errors.email ? (
                        <FormMessage />
                      ) : (
                        <FormDescription className="text-xs">
                          {t("email_rule")}
                        </FormDescription>
                      )}
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="text-right">
              <CustomLoadingButton
                content="Submit"
                loading={loading}
                type="submit"
                size="lg"
                className="text-lg"
              />
            </div>
          </form>
        </Form>
      </div>
      <SuccessfulDialog
        open={openSuccessfulDialog}
        setOpen={setOpenSuccessfulDialog}
        heading={t("create_review_success")}
        description={t("create_review_success_desc")}
      />
    </>
  );
};

export default AddReviewForm;
