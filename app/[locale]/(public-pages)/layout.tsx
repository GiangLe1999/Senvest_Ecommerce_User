import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PublicPagesLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default PublicPagesLayout;
