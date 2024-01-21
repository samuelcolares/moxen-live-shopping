"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";


export default function CarouselSkeleton() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-3/4 z-10"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <Card>
              <CardContent className="flex flex-col gap-4 p-2 justify-center group">
                <Skeleton className="aspect-video bg-gray-800 w-full rounded-md" />
                <div className="flex gap-4">
                  <Skeleton className="rounded-full aspect-square w-12 h-12 bg-gray-900" />
                  <div className="w-full flex flex-col gap-1">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="top-auto -bottom-14 left-0 z-10" />
      <CarouselNext className="top-auto -bottom-14 left-10 z-10" />
    </Carousel>
  );
}
