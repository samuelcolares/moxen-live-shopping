import { getProducts } from "@/lib/product-service";
import React from "react";
import { LiveForm } from "./_components/live-form";
import { getUniqueLive } from "@/lib/live-service";

const FormLivePage = async ({ params }: { params: { liveId: string } }) => {
  const products = await getProducts();
  const live = await getUniqueLive(params.liveId);


  return (
    <div className="space-y-4 p-8">
      <LiveForm initialData={live} products={products} />
    </div>
  );
};

export default FormLivePage;
