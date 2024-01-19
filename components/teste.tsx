"use client";
import CarouselSkeleton from "@/app/(root)/_components/homePage/carouselSkeleton";
import { Calculator, LucideIcon } from "lucide-react";
import React from "react";
import Teste2 from "./teste2";

const Teste = ({ title, Icon }: { title: string, Icon: LucideIcon }) => {
  const [x, y] = React.useState(1);
  return (
    <div onClick={() => y((prev) => prev + 1)}>
      <h2 className="flex items-center gap-2 text-xl mb-2">
        {/* <Icon className="w-8 h-8" /> */}
        <Teste2 Icon={Icon}/>
        <span>{title}</span>
      </h2>
      <CarouselSkeleton />
    </div>
  );
};

export default Teste;

// export default Teste
