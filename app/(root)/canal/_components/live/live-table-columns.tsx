"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type LiveData = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<LiveData>[] = [
  {
    accessorKey: "status",
    header: "Título da Live",
  },
  {
    accessorKey: "email",
    header: "Início",
  },
  {
    header: "Termino",
  },
  {
    accessorKey: "amount",
    header: "Produtos Cadastrados",
  },
  {
    header: "Ações",
  },
];
