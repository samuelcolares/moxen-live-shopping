import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-full flex flex-col gap-4 items-center justify-center">
      <h2 className="text-3xl">Você não possui nenhum produto cadastrado ainda.</h2>
      <Button asChild>
        <Link href={"/canal/produto/novoProduto"}>Cadastrar Produto</Link>
      </Button>
    </div>
  );
};

export default NotFound;