import { currentUser } from "@clerk/nextjs";
import React from "react";
import Profile from "./general/profile";
import TabsToggle from "./general/tabs";
import { cookies } from "next/headers";
import { LiveData } from "./live/live-table-columns";
import { ProductData } from "./product/product-table-columns";

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
  if (!user) return null;
  return (
    <>
      <Profile
        liveQty={0}
        productQty={12}
        name={user.firstName!}
        surname={user.lastName!}
        username={user.username!}
        userImg={user.imageUrl}
      />
      <TabsToggle
        defaultValue={defaulTabsValue}
        livesData={data}
        produtosData={data as ProductData[]}
      />
    </>
  );
};

export default Canal;
