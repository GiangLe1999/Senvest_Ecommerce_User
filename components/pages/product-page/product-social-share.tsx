import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactShareSocial } from "react-share-social";
import { useTranslations } from "next-intl";

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
  copyUrl: {
    fontSize: "14px",
    color: "#374151",
    overflow: "hidden",
    paddingRight: "4px",
  },
  copyIcon: {
    fontSize: "14px",
    backgroundColor: "#B26C53",
    height: "44px",
    display: "grid",
    placeItems: "center",
    color: "white",
    borderRadius: "0 2px 2px 0",
    fontWeight: "normal",
  },
  copyContainer: {
    border: "1px solid #F7F0ED",
    background: "#F7F0ED",
    paddingTop: 10,
    paddingBottom: 10,
  },
};

const ProductSocialShare: FC<Props> = ({ open, setOpen, url }): JSX.Element => {
  const t = useTranslations("share_socials_dialog");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary mb-1 font-bold">
            {t("share_product")}
          </DialogTitle>
          <DialogDescription>{t("share_product_desc")}</DialogDescription>
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
