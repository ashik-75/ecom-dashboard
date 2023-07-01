"use client";

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

function RootLayout({ children }: PropsWithChildren) {
  const { userId } = useAuth();

  if (!userId) {
    redirect("/sign-in");
  }
  return <div>{children}</div>;
}

export default RootLayout;
