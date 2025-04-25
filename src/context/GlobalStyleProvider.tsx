"use client";

import { ReactNode } from "react";
import GlobalStyle from "@/styles/GlobalStyle";

export default function GlobalStyleProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
}
