import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export interface CategoryColumnType {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
}

export const columns: ColumnDef<CategoryColumnType>[] = [
  {
    accessorKey: "name",
    header: () => "Name",
  },
  {
    accessorKey: "billboardLabel",
    header: () => "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction {...row.original} />,
  },
];
