"use client";
import React from "react";
import CarouselSkeleton from "./carouselSkeleton";
import { LucideIcon } from "lucide-react";
import { CalendarRange, MonitorCheck, Radio } from "lucide-react";

type HomeSectionProps = {
  title: string;
  icon: "live" | "proxima" | "finalizada";
  lives: [];
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
}) => {
  const Icon = icons[icon]
  return (
    <section>
      <h2 className="flex items-center gap-2 text-xl mb-2">
        <Icon className="w-8 h-8" />
        <span>{title}</span>
      </h2>
      <div className="w-full flex justify-center mb-12">
        {lives.length === 0 && <CarouselSkeleton />}
      </div>
    </section>
  );
};
