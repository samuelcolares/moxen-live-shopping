import React from "react";
import { ProductForm } from "@/components/forms/product-form";
import { getUniqueProduct } from "@/lib/product-service";

const FormProdutoPage = async ({
  params,
}: {
  params: { produtoId: string };
}) => {
  const product = await getUniqueProduct(params.produtoId);

  return (
    <div className="space-y-4 lg:p-8 p-2">
      <ProductForm initialData={product} />
    </div>
  );
};

export default FormProdutoPage;
