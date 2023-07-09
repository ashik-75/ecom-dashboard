import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface DashboardProps {
  params: {
    storeId: string;
  };
}

async function Dashboard({ params }: DashboardProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <p>Dashboard</p>
      <p>{JSON.stringify(session, null, 2)}</p>
    </div>
  );
}

export default Dashboard;
