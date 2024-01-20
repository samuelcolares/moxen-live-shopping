import { NextResponse } from "next/server";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

import { Product } from "@/types";

export const getProducts = async () => {
  const products = await db.product.findMany();

  return products;
};

export const getUniqueProduct = async (id: string) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
  });

  return product;
};

export const createProduct = async (data: Product) => {
  try {
    const self = await getSelf();

    const product = await db.product.create({
      data: {
        userId: self.id,
        images: data.images,
        productQty: +data.productQty,
        name: data.name,
      },
    });

    return NextResponse.json(product), { status: 200 };
  } catch (error) {
    console.log("Projeto Create Error", error);
    return NextResponse.json("Internal Error"), { status: 500 };
  }
};

export const updateProduct = async (id: string, data: Product) => {
  try {
    const self = await getSelf();
    const product = await db.product.updateMany({
      where: {
        userId: self.id,
        id,
      },
      data: {
        images: data.images,
        productQty: +data.productQty,
        name: data.name,
      },
    });

    return NextResponse.json(product), { status: 200 };
  } catch (error) {
    console.log("Projeto Update Error", error);
    return NextResponse.json("Internal Error"), { status: 500 };
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const self = await getSelf();

    const product = await db.product.delete({
      where: {
        userId: self.id,
        id,
      },
    });

    return NextResponse.json(product), { status: 200 };
  } catch (error) {
    console.log("Projeto Delete Error", error);
    return NextResponse.json("Internal Error"), { status: 500 };
  }
};
