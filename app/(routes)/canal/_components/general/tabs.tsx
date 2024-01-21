"use client";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { columns as LiveColumns } from "../live/live-table-columns";
import { columns as ProductColumns } from "../product/product-table-columns";

import { Product, Live } from "@prisma/client";
import { DataTable } from "@/components/data-table";

type TabsProps = {
  defaultValue: "lives" | "produtos";
  livesData: Live[];
  produtosData: Product[];
};

const TabsToggle: React.FC<TabsProps> = ({
  defaultValue = "lives",
  livesData,
  produtosData,
}) => {
  return (
    <Tabs
      defaultValue={defaultValue}
      className="mb-4"
      onValueChange={(value: string) => {
        document.cookie = `tabs-choice:value=${JSON.stringify(value)}`;
      }}
    >
      <div className="flex">
        <TabsList>
          <TabsTrigger value="lives">Lives</TabsTrigger>
          <TabsTrigger value="produtos">Produtos</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="lives">
        <DataTable
          columns={LiveColumns}
          data={livesData}
          placeholder="Filtre por Título da live"
          columnId="title"
        />
      </TabsContent>
      <TabsContent value="produtos">
        <DataTable
          columns={ProductColumns}
          data={produtosData}
          placeholder="Filtre pelo nome do produto"
          columnId="name"
        />
      </TabsContent>
    </Tabs>
  );
};

export default TabsToggle;
