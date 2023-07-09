import MainNav from "@/components/navbar/main-nav";
import Profile from "@/components/navbar/profile";
import StoreSwitcher from "@/components/navbar/store-switcher";
import ThemeToggler from "@/components/navbar/theme-toggler";
import { authOptions } from "@/lib/authOptions";
import prismadb from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function Navbar() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      user: session?.user?.email!,
    },
  });

  if (!stores) {
    redirect("/");
  }
  return (
    <div className="h-16 items-center flex  border-b px-10">
      <div className="mr-5">
        <StoreSwitcher items={stores} />
      </div>

      <div>
        <MainNav />
      </div>

      <div className="flex space-x-2 ml-auto">
        <ThemeToggler />
        <Profile />
      </div>
    </div>
  );
}

export default Navbar;
