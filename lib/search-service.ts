import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getSearch = async (term: string) => {
  const live = await db.live.findMany({
    where: {
      title: {
        contains: term,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return live;
};

