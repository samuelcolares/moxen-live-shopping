import React from "react";
import Canal from "./_components";
import { currentUser } from "@clerk/nextjs";

const SeuCanalPage = async () => {

  return (
    <section className="p-4">
      <Canal />
    </section>
  );
};

export default SeuCanalPage;
