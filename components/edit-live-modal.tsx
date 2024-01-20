import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { Live, Prisma } from "@prisma/client";
import { ParsedLiveProduct } from "@/types";
import { LiveForm } from "@/app/(routes)/canal/live/[liveId]/_components/live-form";
import { Button } from "./ui/button";
import { getProductsByUserId } from "@/lib/product-service";

type EditModalProps = {
  title: string;
  liveDescription: string;
  thumbnail: string;
  products: Prisma.JsonValue;
};

const EditLiveModal = async ({ initialData }: { initialData: Live }) => {
  const products = await getProductsByUserId();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Editar</Button>
      </DialogTrigger>
      <DialogContent className="xl:max-w-[700px] p-2">
        <DialogHeader className="p-4">
          <DialogTitle>Editar live</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[600px] p-4">
          <LiveForm initialData={initialData} products={products} isModal />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditLiveModal;
