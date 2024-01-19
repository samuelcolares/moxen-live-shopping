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
import Link from "next/link";
import { LucideIcon, MoreVertical, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@clerk/nextjs";



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
                  <DropDown />
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="top-auto -bottom-14 left-auto right-12 z-10" />
      <CarouselNext className="top-auto -bottom-14 right-2 z-10" />
    </Carousel>
  );
}

const DropDown = () => {
  // const auth = useAuth()
  // console.log(auth.userId)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="p-1 h-fit rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          variant={"ghost"}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            alert(`oi`);
          }}
        >
          Detalhes
        </DropdownMenuItem>
        <DropdownMenuItem>Editar</DropdownMenuItem>
        <DropdownMenuItem>Deletar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


/**
|--------------------------------------------------

<Skeleton className="rounded-full aspect-square w-12 bg-gray-900 min-w-12" />
                    <div className="w-full flex flex-col gap-2">
                      <Skeleton className="w-3/4 h-4" />
                      <Skeleton className="w-1/2 h-4" />
                      <Skeleton className="w-1/2 h-2" />
                    </div>


Skell Global
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <Card className="">
              <Link href={`#`}>
                <CardContent className="flex flex-col gap-4 p-2 justify-center group">
                  <Skeleton className="aspect-video bg-gray-800 w-full rounded-md" />
                  <div className="flex gap-4">
                    <Skeleton className="rounded-full aspect-square w-12 h-12 bg-gray-900" />
                    <div className="w-full flex flex-col gap-1">
                      <p className="text-base">Live Name {index +1}</p>
                      <p className="text-sm">Live Creator</p>
                      <p className="text-xs">Live Creator - Duration</p>
                    </div>
                    <DropDown />
                  </div>
                </CardContent>
              </Link>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
|--------------------------------------------------
*/
