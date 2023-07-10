import Navbar from "@/components/navbar";
import { authOptions } from "@/lib/authOptions";
import prismadb from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const store = await prismadb.store.findFirst({
    where: {
      user: session?.user?.email!,
    },
  });

  if (!store) {
    redirect("/");
  }
  return (
    <div className="h-full w-full">
      {/* @ts-expect-error */}
      <Navbar />
      <div className="max-w-7xl mx-auto h-[100%] w-[100%] mt-10">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
