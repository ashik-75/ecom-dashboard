import prismadb from "@/lib/prisma";
import { format } from "date-fns";
import BillboardClient from "./components/client";
import { BillBoardType } from "./components/columns";

interface BillboardProps {
  params: {
    storeid: string;
  };
}

async function Billboard({ params }: BillboardProps) {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeid,
    },
  });

  const formattedData: BillBoardType[] = billboards.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    date: format(billboard.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <BillboardClient data={formattedData} />
    </div>
  );
}

export default Billboard;
