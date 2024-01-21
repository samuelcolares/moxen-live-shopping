import { NextResponse } from "next/server";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

import { Live } from "@/types";
import { notFound } from "next/navigation";

export const getLives = async () => {
  const lives = await db.live.findMany();
  return lives;
};

export const getLivesByUserId = async () => {
  const self = await getSelf();
  const lives = await db.live.findMany({
    where: {
      userId: self.id,
    },
  });

  return lives;
};

export const getUniqueLive = async (id: string) => {
  const live = await db.live.findUnique({
    where: {
      id,
    },
  });

  return live;
};

export const getLiveAndUserInfo = async (id: string) => {
  const live = await db.live.findUnique({
    where: {
      id,
    },
  });

  if (!live) {
    return notFound();
  }

  const contentCreator = await db.user.findFirst({
    where: {
      id: live.userId,
    },
  });

  if (!contentCreator) {
    return notFound();
  }

  return {live, contentCreator};
};

export const createLive = async (data: Live) => {
  try {
    const self = await getSelf();

    const { dateEnd, dateStart, description, thumbnailUrl, title, products } =
      data;

    const live = await db.live.create({
      data: {
        userImg: self.imageUrl,
        userId: self.id,
        username: self.username,
        dateEnd,
        dateStart,
        description,
        thumbnailUrl,
        title,
        products,
      },
    });

    return NextResponse.json(live), { status: 200 };
  } catch (error) {
    console.log("Live Create Error", error);
    return NextResponse.json("Internal Error"), { status: 500 };
  }
};

export const updateLive = async (id: string, data: Live) => {
  try {
    const self = await getSelf();
    const { dateEnd, dateStart, description, thumbnailUrl, title, products } =
      data;
    const live = await db.live.updateMany({
      where: {
        userId: self.id,
        id,
      },
      data: {
        username: self.username,
        dateEnd,
        dateStart,
        description,
        thumbnailUrl,
        title,
        products,
      },
    });

    return NextResponse.json(live), { status: 200 };
  } catch (error) {
    console.log("Live Update Error", error);
    return NextResponse.json("Internal Error"), { status: 500 };
  }
};


export const deleteLive = async (id: string) => {
  try {
    const self = await getSelf();

    const live = await db.live.delete({
      where: {
        userId: self.id,
        id,
      },
    });

    return NextResponse.json(live), { status: 200 };
  } catch (error) {
    console.log("Live Delete Error", error);
    return NextResponse.json("Internal Error"), { status: 500 };
  }
};
