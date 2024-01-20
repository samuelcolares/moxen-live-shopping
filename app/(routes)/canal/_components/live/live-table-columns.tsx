"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Live } from "@prisma/client";
import dayjs from "dayjs";
import CellActions from "@/components/cell-actions";

export const columns: ColumnDef<Live>[] = [
  {
    accessorKey: "title",
    header: "Título da Live",
  },
  {
    accessorKey: "dateStart",
    header: "Início",
    cell: ({ row }) => {
      const date = dayjs(row.original.dateStart).format("DD/MM/YY - HH:mm");
      return <p>{date}</p>;
    },
  },
  {
    accessorKey: "dateEnd",
    header: "Termino",
    cell: ({ row }) => {
      const date = dayjs(row.original.dateEnd).format("DD/MM/YY - HH:mm");
      return <p>{date}</p>;
    },
  },
  {
    accessorKey: "products",
    header: "Produtos Cadastrados",
    cell: ({ row }) => {
      const original = row.original.products;
      const length = JSON.parse(original as string).length;

      return <p>{length}</p>;
    },
  },
  {
    header: "Ações",
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} tab="live" />,
  },
];

