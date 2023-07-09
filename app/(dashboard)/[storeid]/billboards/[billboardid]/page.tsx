import { authOptions } from "@/lib/authOptions";
import prismadb from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import BillboardForm from "./components/BillboardForm";

interface PropsType {
  params: {
    billboardid: string;
    storeid: string;
  };
}

async function SingleBillboard({ params }: PropsType) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardid,
    },
  });

  return (
    <div>
      <BillboardForm initialValue={billboard} />
    </div>
  );
}

export default SingleBillboard;
