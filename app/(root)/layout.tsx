import { authOptions } from "@/lib/authOptions";
import prismadb from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

async function RootLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);
  console.log("ROOT: ", session);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const store = await prismadb.store.findFirst({
    where: {
      user: session?.user?.email!,
    },
  });

  if (store) {
    return redirect(`/${store.id}`);
  }
  return <div>{children}</div>;
}

export default RootLayout;
