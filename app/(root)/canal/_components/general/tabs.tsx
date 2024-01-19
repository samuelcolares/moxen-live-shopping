"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { LivesTable } from "../live/live-table";
import { LiveData, columns as asd } from "../live/live-table-columns";
import { ProductTable } from "../product/product-table";
import { columns } from "../product/product-table-columns";
import { Product } from "@prisma/client";

type TabsProps = {
  defaultValue: "lives" | "produtos";
  livesData: LiveData[];
  produtosData: Product[];
};

const TabsToggle: React.FC<TabsProps> = ({
  defaultValue = "lives",
  livesData,
  produtosData,
}) => {
  const [selectedValue, setSelectedValue] = React.useState<
    "lives" | "produtos"
  >(defaultValue);
  return (
    <>
      {/* <Heading title="Lives" />
      <Separator className="my-2" /> */}
      <Tabs
        defaultValue={defaultValue}
        className="mb-4"
        onValueChange={(value: string) => {
          console.log(value)
          document.cookie = `tabs-choice:value=${JSON.stringify(value)}`;
          setSelectedValue(value as "lives" | "produtos");
        }}
      >
        <div className="flex">
          <TabsList>
            <TabsTrigger value="lives">Lives</TabsTrigger>
            <TabsTrigger value="produtos">Produtos</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="lives">
          <LivesTable columns={asd} data={livesData} />
        </TabsContent>
        <TabsContent value="produtos">
          <ProductTable columns={columns} data={produtosData} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default TabsToggle;
