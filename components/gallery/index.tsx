"use client"
import React, { Suspense } from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import GalleryTab from "./gallery-tab";
import { Skeleton } from "@/components/ui/skeleton";

type GalleryProps = {
  title: string;
  images: Array<string>;
};

const Gallery: React.FC<GalleryProps> = ({ images, title }) => {
  const mappedImages = images.map((image, index) => (
    <GalleryTab
      key={image + index}
      image={image}
      title={title}
      slideIndex={index}
    />
  ));
  const mappedImagesPanel = images.map((image, index) => (
    <Tab.Panel key={image + index}>
      <div className="aspect-video relative w-full h-full sm:rounded-lg overflow-hidden border">
        <Suspense fallback={<Skeleton className="h-full" />}>
          <Image
            fill
            src={image}
            alt={`${title} selected slide`}
            className="object-contain object-center"
          />
        </Suspense>
      </div>
    </Tab.Panel>
  ));
  return (
    <Tab.Group as="div" className="flex flex-col">
      <Tab.Panels className="aspect-video w-full">
        {mappedImagesPanel}
      </Tab.Panels>
      <div className="mx-auto mt-2 w-full max-w-2xl  lg:max-w-none">
        <Tab.List className="grid grid-cols-5 gap-4">
          <Suspense fallback={<ImagesMapSkell />}>{mappedImages}</Suspense>
        </Tab.List>
      </div>
    </Tab.Group>
  );
};

const ImagesMapSkell = () => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="aspect-square" />
      ))}
    </>
  );
};
export default Gallery;
