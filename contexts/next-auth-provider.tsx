"use client";

// Third-party Imports
import { SessionProvider } from "next-auth/react";
import type { SessionProviderProps } from "next-auth/react";
import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const NextAuthProvider: FC<Props> = ({ children }: SessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
