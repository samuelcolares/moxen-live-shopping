import { createUploadthing, type FileRouter } from "uploadthing/next";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const self = await getSelf();

      return { user: self };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // await db.live.update({
      //   where: { userId: metadata.user.id },
      //   data: {
      //     thumbnailUrl: file.url,
      //   },
      // });
      console.log("Upload complete for userId:", metadata.user.username);

      console.log("file url", file.url);
    }),
    productImages: f({
      image: { maxFileSize: "4MB", maxFileCount: 5 },
    })
      .middleware(async () => {
        const self = await getSelf();

        return { user: self };
      })
      .onUploadComplete(async ({ metadata, file }) => {
        // await db.live.update({
        //   where: { userId: metadata.user.id },
        //   data: {
        //     thumbnailUrl: file.url,
        //   },
        // });
        console.log("Upload complete for userId:", metadata.user.username);

        console.log("file url", file.url);
      }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
