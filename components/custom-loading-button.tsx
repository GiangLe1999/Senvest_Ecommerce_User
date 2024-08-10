import { FC } from "react";
import { Button } from "./ui/button";
import { LoaderCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  loading: boolean;
  content: string;
  type?: "submit" | "reset" | "button" | undefined;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  className?: string;
  onClick?: () => void;
}

const CustomLoadingButton: FC<Props> = ({
  loading,
  content,
  type = "button",
  size = "default",
  className,
  onClick = () => {},
  ...props
}): JSX.Element => {
  const t = useTranslations("common");
  return (
    <Button
      disabled={loading}
      type={type}
      size={size}
      className={className}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <LoaderCircleIcon className="w-4 h-4 animate-spin mr-1" />{" "}
          {t("loading")}
        </>
      ) : (
        content
      )}
    </Button>
  );
};

export default CustomLoadingButton;
