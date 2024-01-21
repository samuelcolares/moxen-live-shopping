import React, { Suspense } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { Prisma } from "@prisma/client";
import { ParsedLiveProduct } from "@/types";

type LiveDetailsModalProps = {
  title: string;
  liveDescription: string;
  thumbnail: string;
  products: Prisma.JsonValue;
};

const LiveDetailsModal: React.FC<LiveDetailsModalProps> = ({
  title,
  liveDescription,
  thumbnail,
  products,
}) => {
  const Products = JSON.parse(products as string) as ParsedLiveProduct[];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <span className="sr-only">Abrir detalhes da live: {title}</span>
          <Eye className="w-5 h-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="xl:max-w-[700px] p-2">
        <DialogHeader className="p-4">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[600px] p-4">
          <div className="space-y-4">
            <div className="aspect-video relative w-full h-full sm:rounded-lg overflow-hidden border">
              <Suspense fallback={<Skeleton className="h-full" />}>
                <Image
                  fill
                  src={thumbnail}
                  alt={`${title}`}
                  className="object-cover object-center"
                />
              </Suspense>
            </div>
            <div className="border rounded-md p-2 space-y-2">
              <h3>Descrição:</h3>
              <ScrollArea className="h-[200px]">{liveDescription}</ScrollArea>
            </div>
            <div className="border rounded md p-2 space-y-4 ">
              <h3>Produtos: ({Products.length})</h3>
              <div className="grid grid-cols-4 gap-4">
                {Products.map((product) => (
                  <div
                    key={product.id}
                    className="relative rounded-md overflow-hidden aspect-square bg-white"
                  >
                    <Image
                      src={product.images[0]}
                      className="bg-black/30"
                      alt={product.name}
                      fill
                    />
                    <span className="absolute bottom-0 bg-black/70 w-full text-center p-1 text-sm truncate">
                      {product.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default LiveDetailsModal;
