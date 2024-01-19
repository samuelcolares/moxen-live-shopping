import { Live, Product } from "@prisma/client";
import { Eye, PencilIcon, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { onDeleteProduct } from "@/app/actions/product-actions";
import { toast } from "sonner";
import AlertModal from "./alert-dialog-modal";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

type CellActionsProps = {
  data: Product | Live;
};

const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const deleteProduct = () => {
    try {
      onDeleteProduct(data.id)
        .then(() => toast.warning("Produto deletado!"))
        .catch(() => toast.error("Error ao deletar o produto!"));
    } catch (error) {
      console.log(error);
      toast.error(
        "Algo de errado aconteceu, visualize o console para mais informações"
      );
    }
  };
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex gap-3">
        <Eye className="w-5 h-5" />
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
              description="Esta ação é irreversível. Isso irá permanentemente deletar este
    produto e remover seus dados de nosso servidor."
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
