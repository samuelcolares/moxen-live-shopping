import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

import { Live } from "@prisma/client";
import { LiveBadge, LiveOverBadge } from "./badge";
import ProfileAvatar from "./profile-avatar";
import dayjs from "dayjs";

type LiveCardProps = {
  live: Live;
  isLive: "live" | "soon" | "over";
};

const LiveCard: React.FC<LiveCardProps> = ({ live, isLive }) => {
  const liveBadge = isLive === "live" && <LiveBadge />;
  const overBadge = isLive === "over" && <LiveOverBadge />;

  return (
    <Card className="">
      <Link href={`/live/${live.id}`}>
        <CardContent className="flex flex-col gap-4 p-2 justify-center group">
          <div className="relative aspect-video bg-gray-800 w-full rounded-md overflow-hidden shadow-lg">
            <Image
              className="object-cover"
              fill
              src={live.thumbnailUrl}
              alt={live.title}
            />
            {liveBadge}
            {overBadge}
          </div>
          <div className="flex gap-4">
            <div className="relative overflow-hidden rounded-full aspect-square min-w-12 h-12 bg-gray-900">
              <ProfileAvatar
                className="w-full h-full"
                alt={live.username}
                src={live.userImg}
                fallback={live.username[0].toUpperCase()}
              />
            </div>
            <div className="w-full flex flex-col">
              <p className="text-base">{live.title}</p>
              <p className="text-sm text-muted-foreground">@{live.username}</p>
              <ul className="text-xs flex gap-2 text-muted-foreground">
                <li>{dayjs(live.dateStart).format("DD/MM - HH:mm")}</li>
                <li>até</li>
                <li>{dayjs(live.dateEnd).format("DD/MM - HH:mm")}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default LiveCard;
