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
import CustomLoadingButton from "@/components/custom-loading-button";
import { Session } from "next-auth";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  session: Session | null;
}

const ProductAskQuestion: FC<Props> = ({
  open,
  setOpen,
  session,
}): JSX.Element => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary mb-1 font-bold">
            Ask about this product
          </DialogTitle>
          <DialogDescription>
            We will get back to you as soon as possible
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-3">
          <DialogClose className="sm:justify-end">
            <CustomLoadingButton
              loading={false}
              content="Submit"
              type="submit"
            />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductAskQuestion;
