"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Live } from "@prisma/client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import ProfileAvatar from "@/components/ui/profile-avatar";
import { LiveBadge, LiveOverBadge } from "@/components/ui/badge";

import dayjs from "dayjs";

const CarouselLives = ({
  lives,
  isLive,
}: {
  lives: Live[];
  isLive: "live" | "soon" | "over";
}) => {
  const liveBadge = isLive === "live" && <LiveBadge />;
  const overBadge = isLive === "over" && <LiveOverBadge />;
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-3/4 z-10"
    >
      <CarouselContent>
        {lives.map((live) => (
          <CarouselItem key={live.id} className="md:basis-1/2 lg:basis-1/4">
            <Card className="">
              <Link href={`/live/${live.id}`}>
                <CardContent className="flex flex-col gap-4 p-2 justify-center group">
                  <div className="relative aspect-video bg-gray-800 w-full rounded-md overflow-hidden">
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
                      <p className="text-sm text-muted-foreground">
                        @{live.username}
                      </p>
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
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="top-auto -bottom-14 left-0 z-10" />
      <CarouselNext className="top-auto -bottom-14 left-10 z-10" />
    </Carousel>
  );
};

export default CarouselLives;
