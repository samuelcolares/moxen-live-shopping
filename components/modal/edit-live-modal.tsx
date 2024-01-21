import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Live } from "@prisma/client";

import { LiveForm } from "@/components/forms/live-form";
import { getProductsByUserId } from "@/lib/product-service";

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
