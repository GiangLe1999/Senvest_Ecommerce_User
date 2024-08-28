import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactShareSocial } from "react-share-social";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
}

const style = {
  root: {
    padding: 0,
    paddingBottom: "20px",
  },
  iconContainer: {
    paddingTop: 0,
  },
  copyContainer: {
    border: "1px solid #F7F0ED",
    background: "#F7F0ED",
    paddingTop: 10,
    paddingBottom: 10,
  },
};

const ProductSocialShare: FC<Props> = ({ open, setOpen, url }): JSX.Element => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary mb-2 font-bold">
            Share this product
          </DialogTitle>
          <DialogDescription>
            Choose the social media you want to share this product.
          </DialogDescription>
        </DialogHeader>

        <ReactShareSocial
          url={url}
          socialTypes={[
            "facebook",
            "twitter",
            "reddit",
            "linkedin",
            "whatsapp",
            "livejournal",
            "email",
          ]}
          style={style}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductSocialShare;
