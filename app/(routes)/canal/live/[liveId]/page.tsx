import { getProductsByUserId } from "@/lib/product-service";
import React from "react";
import { LiveForm } from "@/components/forms/live-form";
import { getUniqueLive } from "@/lib/live-service";
import { notFound, redirect } from "next/navigation";

const FormLivePage = async ({ params }: { params: { liveId: string } }) => {
  const products = await getProductsByUserId();
  const live = await getUniqueLive(params.liveId);

  if (products.length === 0) notFound();

  return (
    <div className="space-y-4 lg:p-8 p-2">
      <LiveForm initialData={live} products={products} />
    </div>
  );
};

export default FormLivePage;
