import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthPagesLayout: FC<Props> = async ({
  children,
}): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return (
    <>
      <main className="mt-12">{children}</main>
    </>
  );
};

export default AuthPagesLayout;
