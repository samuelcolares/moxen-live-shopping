
import React from "react";

import { LiveData, columns } from "./_components/live/live-table-columns";
import { cookies } from "next/headers";
import Canal from "./_components";

async function getData(): Promise<LiveData[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

const SeuCanalPage = async () => {
  const liveTabsValue = cookies().get("live-tabs-choice:value");
  const productTabsValue = cookies().get("product-tabs-choice:value");
  const defaultLiveTabsValue = liveTabsValue
    ? JSON.parse(liveTabsValue.value)
    : undefined;
  const defaultProductTabsValue = productTabsValue
    ? JSON.parse(productTabsValue.value)
    : undefined;
  const data = await getData();

  return (
    <section className="p-4">
      <Canal />
      {/* <Heading title="Lives" />
      <Separator className="my-2" /> */}
      {/* <LiveTabsToggle defaultValue={defaultLiveTabsValue} data={data}/>

      <Heading title="Produtos" />

      <Separator className="my-2" />
      <ProductTabsToggle defaultValue={defaultProductTabsValue} />
      <ProductTable columns={columns} data={data} /> */}
    </section>
  );
};

export default SeuCanalPage;
