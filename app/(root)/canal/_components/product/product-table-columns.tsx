"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductData = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<ProductData>[] = [
  {
    accessorKey: "status",
    header: "Produto",
  },
  {
    accessorKey: "email",
    header: "Quantidade",
  },
  {
    accessorKey: "amount",
    header: "Ações",
  },
]
