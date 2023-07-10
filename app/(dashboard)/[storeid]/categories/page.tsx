import prismadb from "@/lib/prisma";
import { format } from "date-fns";
import CategoryClient from "./components/client";
import { CategoryColumnType } from "./components/columns";

interface CategoryProps {
  params: {
    storeid: string;
  };
}

async function Categories({ params }: CategoryProps) {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeid,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategory: CategoryColumnType[] = categories?.map(
    (category) => ({
      id: category.id,
      name: category.name,
      billboardLabel: category.billboard.label,
      createdAt: format(category.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div>
      <CategoryClient data={formattedCategory} />
    </div>
  );
}

export default Categories;
