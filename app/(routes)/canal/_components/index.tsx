import { currentUser } from "@clerk/nextjs";
import React from "react";
import Profile from "./general/profile";
import TabsToggle from "./general/tabs";
import { cookies } from "next/headers";

import { getProductsByUserId } from "@/lib/product-service";
import { getLivesByUserId } from "@/lib/live-service";

const Canal = async () => {
  const tabsValue = cookies().get("tabs-choice:value");
  const defaulTabsValue = tabsValue ? JSON.parse(tabsValue.value) : undefined;

  const user = await currentUser();
  const products = await getProductsByUserId();
  const lives = await getLivesByUserId();
  if (!user) return null;
  return (
    <>
      <Profile
        liveQty={lives.length}
        productQty={products.length}
        name={user.firstName!}
        surname={user.lastName!}
        username={user.username!}
        userImg={user.imageUrl}
      />
      <TabsToggle
        defaultValue={defaulTabsValue}
        livesData={lives}
        produtosData={products}
      />
    </>
  );
};

export default Canal;
