"use client";

import DataTable from "@/components/dataTable";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CategoryColumnType, columns } from "./columns";

interface CategoryClientProps {
  data: CategoryColumnType[];
}

function CategoryClient({ data }: CategoryClientProps) {
  const [isMounted, setIsMounted] = useState(false);

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <div className="flex justify-between">
        <Header
          title="Category"
          description="Add Category for product showcase"
        />

        <Button
          onClick={() => router.push(`/${params.storeid}/categories/new`)}
        >
          Add Category
        </Button>
      </div>
      <Separator className="my-5" />

      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  );
}

export default CategoryClient;
