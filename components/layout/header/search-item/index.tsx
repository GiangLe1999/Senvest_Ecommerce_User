"use client";

import { SearchIcon } from "lucide-react";
import { FC } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/configs/i18n-navigation";

interface Props {}

const SearchItem: FC<Props> = (props): JSX.Element => {
  const formSchema = z.object({
    keyword: z.string({ message: "Please enter keyword." }).min(2, {
      message: "Keyword must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
    },
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/tim-kiem/${values.keyword}` as any);
  }

  return (
    <div className="h-full flex items-center hover:text-primary transition-colors px-2 font-bold text-sm">
      <Popover>
        <PopoverTrigger aria-label="Search menu">
          <SearchIcon className="sm:w-5 sm:h-5 w-4 h-4" />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[350px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="keyword"
                  render={({ field }) => (
                    <FormItem className="!flex-1">
                      <FormControl>
                        <Input
                          placeholder="Search..."
                          className="h-9 text-foreground w-full"
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.keyword ? (
                        <FormMessage />
                      ) : (
                        <FormDescription className="text-xs mt-1">
                          Enter your search keyword
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />
                <Button type="submit" className="h-9 w-fit">
                  Search
                </Button>
              </div>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchItem;
