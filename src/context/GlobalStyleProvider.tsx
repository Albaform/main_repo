"use client";

import { ReactNode } from "react";
import GlobalStyle from "@/styles/globalStyle";

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
