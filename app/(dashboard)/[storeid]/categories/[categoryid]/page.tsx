import prismadb from "@/lib/prisma";
import CategoryForm from "./components/CategoryForm";

async function page({
  params,
}: {
  params: {
    storeid: string;
    categoryid: string;
  };
}) {
  const category = await prismadb.category.findFirst({
    where: {
      id: params.categoryid,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeid,
    },
  });

  return (
    <div>
      <CategoryForm billboards={billboards} initialValue={category} />
    </div>
  );
}

export default page;
