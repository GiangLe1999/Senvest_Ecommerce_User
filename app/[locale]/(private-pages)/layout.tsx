import { redirect } from "@/configs/i18n-navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PrivatePagesLayout: FC<Props> = async ({
  children,
}): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/dang-nhap");

  return (
    <>
      <main className="mt-[176px]">{children}</main>
    </>
  );
};

export default PrivatePagesLayout;
