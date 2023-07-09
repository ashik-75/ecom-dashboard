import { authOptions } from "@/lib/authOptions";
import prismadb from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SettingsForm from "./components/settings-form";

interface SettingsProps {
  params: {
    storeid: string;
  };
}

async function Settings({ params }: SettingsProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const store = await prismadb.store.findFirst({
    where: {
      user: session.user?.email!,
      id: params.storeid,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div>
      <SettingsForm store={store} />
    </div>
  );
}

export default Settings;
