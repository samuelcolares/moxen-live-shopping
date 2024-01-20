"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { LivesTable } from "./live-table";
import { LiveData, columns } from "./live-table-columns";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

type TabsProps = {
  defaultValue: "table" | "cards";
  data: LiveData[];
};

const LiveTabsToggle: React.FC<TabsProps> = ({
  defaultValue = "table",
  data,
}) => {
  const [selectedValue, setSelectedValue] = React.useState<"table" | "cards">(
    defaultValue
  );
  return (
    <>
      {/* <Heading title="Lives" />
      <Separator className="my-2" /> */}
      <Tabs
        defaultValue={defaultValue}
        className="mb-4"
        onValueChange={(value: string) => {
          document.cookie = `live-tabs-choice:value=${JSON.stringify(value)}`;
          setSelectedValue(value as "table" | "cards");
        }}
      >
        <div className="flex">
          <TabsList>
            <TabsTrigger value="table">Lives</TabsTrigger>
            <TabsTrigger value="cards">Produtos</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="table">
          <LivesTable columns={columns} data={data} />
        </TabsContent>
        <TabsContent value="cards">Cards em breve.</TabsContent>
      </Tabs>
    </>
  );
};

export default LiveTabsToggle;
