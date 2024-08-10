import { FC } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import CustomLoadingButton from "./custom-loading-button";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  heading: string;
  description: string;
  confirm_btn_content: string;
  confirm_btn_action: () => void;
  loading: boolean;
}

const WarningDialog: FC<Props> = ({
  open,
  setOpen,
  heading,
  description,
  confirm_btn_content,
  confirm_btn_action,
  loading,
}): JSX.Element => {
  const t = useTranslations("common");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-500 mb-2 font-bold">
            {heading}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-3">
          <Button
            type="button"
            variant="outline"
            className="text-white"
            onClick={() => setOpen(false)}
          >
            {t("cancel")}
          </Button>
          <DialogClose className="sm:justify-end">
            <CustomLoadingButton
              loading={loading}
              content={confirm_btn_content}
              className="text-white !bg-red-600"
              onClick={confirm_btn_action}
            />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WarningDialog;
