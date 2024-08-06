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

const FormSchema = z.object({
  name: z.string().regex(/^[a-zA-Z. ]+$/, {
    message:
      "Only letters and the dot (.) character, followed by a space, are allowed.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must have at least one special character.",
    }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

interface Props {}

const RegisterForm: FC<Props> = () => {
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
        Đăng ký tài khoản
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Họ và tên</FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  {form.formState.errors.name ? (
                    <FormMessage />
                  ) : (
                    <FormDescription className="text-xs">
                      Only letters and the dot (.) character, followed by a
                      space, are allowed.
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
                <FormLabel className="font-bold">Email</FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input placeholder="johndoe@hotmail.com" {...field} />
                  </FormControl>
                  {form.formState.errors.email ? (
                    <FormMessage />
                  ) : (
                    <FormDescription className="text-xs mt-1">
                      Only accept valid email.
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
                <FormLabel className="font-bold">Password</FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input placeholder="johndoe@hotmail.com" {...field} />
                  </FormControl>
                  {form.formState.errors.email ? (
                    <FormMessage />
                  ) : (
                    <FormDescription className="text-xs mt-1">
                      Password must be at least 6 characters and must have at
                      least one special character.
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
                    Accept terms and conditions{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="text-lg w-full !mt-8 h-12">
            Submit
          </Button>

          <div className="text-sm flex items-center gap-1 justify-end">
            <span className="text-muted">Already have an account?</span>
            <Link
              href="/dang-nhap"
              className="font-semibold hover:text-primary hover:underline transition"
            >
              Đăng nhập
            </Link>
            <span className="text-muted">hoặc</span>
            <Link
              href="/dang-nhap"
              className="font-semibold hover:text-primary hover:underline transition"
            >
              Quên mật khẩu
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
