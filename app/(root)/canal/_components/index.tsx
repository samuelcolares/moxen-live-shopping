import { currentUser } from "@clerk/nextjs";
import React from "react";
import Profile from "./general/profile";
import TabsToggle from "./general/tabs";
import { cookies } from "next/headers";
import { LiveData } from "./live/live-table-columns";

import { getProducts } from "@/lib/product-service";

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

const Canal = async () => {
  const tabsValue = cookies().get("tabs-choice:value");
  const defaulTabsValue = tabsValue ? JSON.parse(tabsValue.value) : undefined;

  const data = await getData();
  const user = await currentUser();
  const products = await getProducts()
  if (!user) return null;
  return (
    <>
      <Profile
        liveQty={0}
        productQty={products.length}
        name={user.firstName!}
        surname={user.lastName!}
        username={user.username!}
        userImg={user.imageUrl}
      />
      <TabsToggle
        defaultValue={defaulTabsValue}
        livesData={data}
        produtosData={products}
      />
    </>
  );
};

export default Canal;
