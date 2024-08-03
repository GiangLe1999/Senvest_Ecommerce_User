"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

const TanstackQueryProvider: FC<Props> = (props) => {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackQueryProvider;
