"use client";
import React from "react";

import { Live } from "@prisma/client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import LiveCard from "@/components/ui/live-card";

const CarouselLives = ({
  lives,
  isLive,
}: {
  lives: Live[];
  isLive: "live" | "soon" | "over";
}) => {
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
            <LiveCard live={live} isLive={isLive} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="top-auto -bottom-14 left-0 z-10" />
      <CarouselNext className="top-auto -bottom-14 left-10 z-10" />
    </Carousel>
  );
};

export default CarouselLives;
