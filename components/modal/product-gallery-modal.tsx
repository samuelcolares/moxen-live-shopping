import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Gallery from "../gallery";

type ProductGalleryModalProps = {
  children: React.ReactNode;
  title: string;
  qty: number;
  images: Array<string>;
};

const ProductGalleryModal: React.FC<ProductGalleryModalProps> = ({
  title,
  images,
  children,
  qty,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="xl:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Quantidade: {qty === 1 ? "1 unidade" : `${qty} unidades`}
          </DialogDescription>
        </DialogHeader>
        <div className="border p-2 rounded-md">
          <Gallery title={title} images={images} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductGalleryModal;
