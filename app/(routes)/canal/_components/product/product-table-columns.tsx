"use client";

import CellActions from "@/components/cell-actions";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";


export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "productQty",
    header: "Quantidade",
  },
  {
    id: "images",
    header: "Imagens",
    cell: ({ row }) => {
      const original = row.original.images;
      const length = JSON.parse(original as string).length;

      return <div>{length}</div>;
    },
  },
  {
    header: "Ações",
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} tab="produto"/>,
  },
];
