import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-full flex flex-col gap-4 items-center justify-center">
      <h2 className="text-3xl">Tal rota não existe</h2>
      <Button asChild>
        <Link href={"/"}>Voltar para o Início</Link>
      </Button>
    </div>
  );
};

export default NotFound;