"use server";

import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/lib/product-service";
import { Product } from "@/types";
import { revalidatePath } from "next/cache";

export const onCreateProduct = async (data: Product) => {
  try {
    await createProduct(data);
    revalidatePath("/canal");
  } catch (error) {
    throw new Error("Interal Error");
  }
};

export const onUpdateProduct = async (productId: string, data: Product) => {
  try {
    await updateProduct(productId, data);
    revalidatePath("/canal");
  } catch (error) {
    throw new Error("Interal Error");
  }
};

export const onDeleteProduct = async (productId: string) => {
  try {
    await deleteProduct(productId);
    revalidatePath("/canal");
  } catch (error) {
    throw new Error("Interal Error");
  }
};
