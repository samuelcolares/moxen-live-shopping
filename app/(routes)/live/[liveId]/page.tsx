import { getLiveAndUserInfo } from "@/lib/live-service";
import React from "react";
import LiveFullDetailsPage from "./_components";
import { currentUser } from "@clerk/nextjs";

const LivePage = async ({ params }: { params: { liveId: string } }) => {
  const user = await currentUser();
  const { live, contentCreator } = await getLiveAndUserInfo(params.liveId);

  return (
    <section>
      <LiveFullDetailsPage
        live={live}
        user={contentCreator}
        liveOwner={contentCreator.externalUserId === user?.id}
      />
    </section>
  );
};

export default LivePage;
