import Link from "next/link";
import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AlertModal from "@/components/alert-dialog-modal";
import { toast } from "sonner";
import { Eye, PencilIcon, Trash } from "lucide-react";

import { onDeleteProduct } from "@/actions/product-actions";

import { Product } from "@prisma/client";
import ProductGalleryModal from "@/components/product-gallery-modal";

type CellActionsProps = {
  data: Product;
};

const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const deleteProduct = () => {
    try {
      onDeleteProduct(data.id)
        .then(() => toast.warning("Produto deletado!"))
        .catch(() => toast.error("Error ao deletar o produto."));
    } catch (error) {
      console.log(error);
      toast.error(
        "Algo de errado aconteceu, visualize o console para mais informações"
      );
    }
  };

  const ProductImages = JSON.parse(data.images as string) as Array<string>;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex gap-3">
        <Tooltip>
          <TooltipTrigger>
            <ProductGalleryModal
              title={data.name}
              images={ProductImages}
              qty={data.productQty}
            >
              <Eye className="w-5 h-5" />
            </ProductGalleryModal>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Ver Produto</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/canal/produto/${data.id}`}>
              <PencilIcon className="w-5 h-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Editar</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <AlertModal
              description={
                "Esta ação é irreversível. Isso irá permanentemente deletar este produto e remover seus dados de nosso servidor."
              }
              deleteFunction={deleteProduct}
            >
              <Trash className="w-5 h-5 hover:text-red-700" />
            </AlertModal>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Deletar Produto</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default CellActions;
