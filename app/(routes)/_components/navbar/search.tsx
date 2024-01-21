"use client";

import qs from "query-string";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: "/buscar",
        query: { termo: value },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative hidden lg:w-[400px] lg:flex items-center"
    >
      <Label className="sr-only text-white" htmlFor="searchInput">
        Caixa de texto para pesquisa
      </Label>
      <Input
        id="searchInput"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:bg-black/20 bg-white/20 text-white placeholder:text-white focus:bg-black/70 h-9 border-r-0 border-transparent"
      />
      {value && (
        <X
          className="absolute top-1/2 -translate-y-1/2 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
          onClick={onClear}
        />
      )}
      <Button
        type="submit"
        size="sm"
        variant="secondary"
        className="dark:text-muted-foreground text-white rounded-l-none dark:bg-black/40 bg-white/30 dark:hover:bg-black/60 hover:bg-black/50 h-[36px]"
      >
        <span className="sr-only text-white">Botão Pesquisar</span>
        <SearchIcon className="h-5 w-5 " />
      </Button>
    </form>
  );
};
