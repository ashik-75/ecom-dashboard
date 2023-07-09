"use client";

import { SessionProvider as NextSessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

function SessionProvider({ children }: PropsWithChildren) {
  return <NextSessionProvider>{children}</NextSessionProvider>;
}

export default SessionProvider;
