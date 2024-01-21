"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SearchIcon, X } from "lucide-react";

const SearchMobile = () => {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="submit"
          size="sm"
          variant="secondary"
          className="text-white border p-2 w-9 h-9 border-muted-foreground bg-transparent"
        >
          <span className="sr-only text-white">Botão Pesquisar</span>
          <SearchIcon className="h-5 w-5 " />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-4/5 rounded-md dark:bg-[#100d1d]">
        <DialogHeader>
          <DialogTitle>Pesquisar</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="items-center">
          <Label className="text-white relative" htmlFor="searchInput">
            <Input
              id="searchInput"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Buscar"
              className=""
            />
            {value && (
              <X
                className="absolute top-1/2 -translate-y-1/2 right-2 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
                onClick={onClear}
              />
            )}
          </Label>

          <div className="mt-2 w-full">
            <DialogClose asChild>
              <Button type="submit" className="w-full flex gap-3">
                <SearchIcon className="h-5 w-5 " />
                <span>Pesquisar</span>
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SearchMobile;
