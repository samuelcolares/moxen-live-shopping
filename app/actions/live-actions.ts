"use server";

import { createLive, deleteLive, updateLive } from "@/lib/live-service";

import { Live } from "@/types";
import { revalidatePath } from "next/cache";

export const onCreateLive = async (data: Live) => {
  try {
    await createLive(data);
    revalidatePath("/canal");
  } catch (error) {
    throw new Error("Interal Error");
  }
};

export const onUpdateLive = async (liveId: string, data: Live) => {
  try {
    await updateLive(liveId, data);
    revalidatePath("/canal");
  } catch (error) {
    throw new Error("Interal Error");
  }
};

export const onDeleteLive = async (liveId: string) => {
  try {
    await deleteLive(liveId);
    revalidatePath("/canal");
  } catch (error) {
    throw new Error("Interal Error");
  }
};
