import Empty from "@/components/empty";
import { Button } from "@/components/ui/button";
import { Link } from "@/configs/i18n-navigation";
import { CirclePlusIcon } from "lucide-react";
import { FC } from "react";

interface Props {}

const NoAccountAddresses: FC<Props> = (props): JSX.Element => {
  return (
    <>
      <Empty />
      <div className="text-center mt-4">
        <Button>
          <Link href="/tai-khoan/dia-chi/tao-moi" className="flex items-center">
            <CirclePlusIcon className="w-4 h-4 mr-1" /> Add a new address
          </Link>
        </Button>
      </div>
    </>
  );
};

export default NoAccountAddresses;
