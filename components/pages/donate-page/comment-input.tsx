"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {
  comment: { show: boolean; msg: string };
  setComment: Dispatch<SetStateAction<{ show: boolean; msg: string }>>;
}

const CommentInput: FC<Props> = ({ comment, setComment }): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("donate_page");

  useEffect(() => {
    if (comment.show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [comment.show]);

  return (
    <>
      <div className="flex items-center space-x-2 mt-6 mb-2">
        <Checkbox
          id="comment"
          className="accent-primary"
          checked={comment.show}
          onCheckedChange={() => {
            setComment((prev) => ({ ...prev, show: !prev.show }));
            if (!comment.show) {
              setComment((prev) => ({ ...prev, msg: "" }));
            }
          }}
        />
        <label
          htmlFor="comment"
          className="cursor-pointer text-sm text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t("comment_checkbox")}
        </label>
      </div>

      <Input
        className={cn(
          "border-2 border-[#dedfe0] bg-white",
          !comment.show && "hidden"
        )}
        placeholder={t("comment_placeholder")}
        ref={inputRef}
        value={comment.msg}
        onChange={(e) =>
          setComment((prev) => ({ ...prev, msg: e.target.value }))
        }
      />

      <div
        className={cn(
          !comment.show && "hidden",
          "mt-2 relative bg-[#fff5d3] border shadow-[0_2px_4px_rgba(0,0,0,0.2)] text-[13px] leading-[18px] text-[#2f2f30] px-4 pt-2 py-3 rounded-sm border-solid border-[#e2d4a4] after:content-[''] after:absolute after:w-3 after:h-3 after:bg-[#fff5d3] after:rotate-45 after:shadow-[-1px_-1px_0_0_#e2d4a4] after:left-[22px] after:-top-1.5"
        )}
      >
        {t("comment_note")}
      </div>
    </>
  );
};

export default CommentInput;
