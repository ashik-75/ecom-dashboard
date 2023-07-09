"use client";

import { createColumnHelper } from "@tanstack/react-table";
import CellActions from "./cell-actions";

export interface BillBoardType {
  label: string;
  date: string;
  id: string;
}

const columnHelper = createColumnHelper<BillBoardType>();

export const billboardColumn = [
  columnHelper.accessor("label", {
    header: () => "Label",
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor("date", {
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.display({
    id: "action",
    cell: ({ row }) => <CellActions data={row.original} />,
  }),
];
