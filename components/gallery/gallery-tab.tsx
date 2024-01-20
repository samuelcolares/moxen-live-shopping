"use client";
import React from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";

export interface ImageType {
  url: string;
}

type GalleryTabProps = {
  title: string;
  image: string;
  slideIndex: number;
};

const GalleryTab: React.FC<GalleryTabProps> = ({
  image,
  slideIndex,
  title,
}) => {
  return (
    <Tab className="relative  aspect-square cursor-pointer  rounded-md">
      {({ selected }) => (
        <div>
          <span className="absolute h-full w-full aspect-square inset-0 rounded-md overflow-hidden">
            <Image
              fill
              src={image}
              alt={`${title} slide ${slideIndex + 1}`}
              className="object-cover object-center"
            />
          </span>
          <span
            className={cn(
              "absolute inset-0 rounded-md ring-2",
              selected ? "ring-primary-color" : "ring-foreground"
            )}
          />
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
