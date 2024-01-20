"use client";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LivesTable } from "../live/live-table";
import { ProductTable } from "../product/product-table";
import { columns as LiveColumns } from "../live/live-table-columns";
import { columns as ProductColumns } from "../product/product-table-columns";

import { Product, Live } from "@prisma/client";

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
        <LivesTable columns={LiveColumns} data={livesData} />
      </TabsContent>
      <TabsContent value="produtos">
        <ProductTable columns={ProductColumns} data={produtosData} />
      </TabsContent>
    </Tabs>
  );
};

export default TabsToggle;
