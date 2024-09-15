import { FC, useState } from "react";
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

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { nameRegex } from "@/data/regexes";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createQuestion } from "@/actions/question.actions";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  session: Session | null;
  t: any;
  product_id: string;
}

const ProductAskQuestion: FC<Props> = ({
  open,
  setOpen,
  session,
  t,
  product_id,
}): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const FormSchema = z.object({
    name: z.string().regex(nameRegex, {
      message: t("name_rule"),
    }),
    email: z.string().email({
      message: t("email_rule"),
    }),
    phone: z.string().optional(),
    question: z.string().min(1, {
      message: t("question_rule"),
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: session ? session.user.name : "",
      email: session ? session.user.email : "",
      phone: "",
      question: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const res = await createQuestion({
        ...data,
        product: product_id,
      });

      if (res.ok) {
        setLoading(false);
        setOpen(false);
        form.reset();
        toast.success(t("create_question_success"), {
          description: t("create_question_success_desc"),
        });
      } else {
        setLoading(false);
        return toast.error(t("create_question_fail_1"), {
          description: t("create_question_fail_1_desc"),
        });
      }
    } catch (error) {
      setLoading(false);
      return toast.error(t("create_question_fail_2"), {
        description: t("create_question_fail_2_desc"),
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl max-w-[95%] mt-[65px]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-primary mb-1 font-bold">
            {t("ask_question_about_product")}
          </DialogTitle>
          <DialogDescription>
            {t("ask_question_about_product_desc")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

            <div className="grid grid-cols-2 gap-4">
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
                    <FormLabel className="font-bold">
                      {t("phone")}
                      <span className="text-destructive"> *</span>
                    </FormLabel>
                    <div className="flex-1">
                      <FormControl>
                        <Input placeholder={t("phone")} {...field} />
                      </FormControl>

                      <FormDescription className="text-xs">
                        {t("phone_optional")}
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">{t("question")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("question_rule")}
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.question ? (
                    <FormMessage />
                  ) : (
                    <FormDescription className="text-xs">
                      {t("question_rule")}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <DialogFooter className="mt-3">
              <div className="sm:justify-end">
                <CustomLoadingButton
                  loading={loading}
                  content="Submit"
                  type="submit"
                />
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductAskQuestion;
