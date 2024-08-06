import Header from "@/components/layout/header";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PublicPagesLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      <main className="mt-12">{children}</main>
    </>
  );
};

export default PublicPagesLayout;
