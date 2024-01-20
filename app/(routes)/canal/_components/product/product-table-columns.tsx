"use client";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./product-cell-actions";

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
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
