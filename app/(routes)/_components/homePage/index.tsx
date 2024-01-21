"use client";
import React from "react";

import { LucideIcon } from "lucide-react";
import { CalendarRange, MonitorCheck, Radio } from "lucide-react";
import { Live } from "@prisma/client";
import CarouselLives from "./carousel-lives";
import CarouselSkeleton from "./carouselSkeleton";

type HomeSectionProps = {
  title: string;
  icon: "live" | "proxima" | "finalizada";
  lives: Live[];
  isLive: "live" | "soon" | "over";
};

const icons: {
  [key: string]: LucideIcon;
} = {
  proxima: CalendarRange,
  live: Radio,
  finalizada: MonitorCheck,
};

export const HomeSection: React.FC<HomeSectionProps> = ({
  title,
  icon,
  lives,
  isLive,
}) => {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const Icon = icons[icon];
  return (
    <section>
      <h2 className="flex items-center gap-2 text-xl mb-2">
        <Icon className="w-8 h-8" />
        <span>{title}</span>
      </h2>
      <div className="w-full flex justify-center mb-12">
        {!isMounted && <CarouselSkeleton />}
        {isMounted && <CarouselLives lives={lives} isLive={isLive} />}
      </div>
    </section>
  );
};
