"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type TabsProps = {
  defaultValue: "table" | "cards";
};

const ProductTabsToggle: React.FC<TabsProps> = ({ defaultValue = "table" }) => {
  const [selectedValue, setSelectedValue] = React.useState<"table" | "cards">(
    defaultValue
  );
  return (
    <Tabs
      defaultValue={defaultValue}
      className="s"
      onValueChange={(value: string) => {
        document.cookie = `product-tabs-choice:value=${JSON.stringify(value)}`;
        setSelectedValue(value as "table" | "cards");
      }}
    >
      <div className="flex">
        <TabsList >
          <TabsTrigger value="table">Tabela</TabsTrigger>
          <TabsTrigger value="password">Cards</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="table">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default ProductTabsToggle;
