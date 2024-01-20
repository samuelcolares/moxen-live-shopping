import { db } from "./db";

export const getUserById = async (userServerId: string) => {
  const user = await db.user.findUnique({
    where: { id: userServerId },
  });

  return user;
};
