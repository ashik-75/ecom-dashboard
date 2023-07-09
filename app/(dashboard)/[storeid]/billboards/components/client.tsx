"use client";

import DataTable from "@/components/dataTable";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillBoardType, billboardColumn } from "./columns";

function BillboardClient({ data }: { data: BillBoardType[] }) {
  const router = useRouter();
  const params = useParams();

  return (
    <div>
      <div className="flex justify-between">
        <Header
          title="Billboard"
          description="Manage billboard for your store"
        />

        <Button
          onClick={() => router.push(`/${params?.storeid}/billboards/new`)}
        >
          <Plus className="h-4 w-4 text-muted-foreground mr-2" />
          <span>Add</span>
        </Button>
      </div>
      <Separator className="my-3" />

      <DataTable columns={billboardColumn} data={data} searchKey="label" />
    </div>
  );
}

export default BillboardClient;
