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
import { onDeleteLive } from "@/app/actions/live-actions";

type CellActionsProps = {
  data: Product | Live;
  tab: "produto" | "live";
};

const CellActions: React.FC<CellActionsProps> = ({ data, tab }) => {
  const deleteProduct = () => {
    try {
      if (tab === "produto") {
        onDeleteProduct(data.id)
          .then(() => toast.warning("Produto deletado!"))
          .catch(() => toast.error("Error ao deletar o produto!"));
      }
      if (tab === "live") {
        onDeleteLive(data.id)
          .then(() => toast.warning("Live deletada!"))
          .catch(() => toast.error("Error ao deletar live!"));
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Algo de errado aconteceu, visualize o console para mais informações"
      );
    }
  };

  const alertModalDescription =
    tab === "produto"
      ? "Esta ação é irreversível. Isso irá permanentemente deletar este produto e remover seus dados de nosso servidor."
      : "Esta ação é irreversível. Isso irá permanentemente deletar esta live e remover os dados de nosso servidor.";

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex gap-3">
        <Eye className="w-5 h-5" />
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/canal/${tab}/${data.id}`}>
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
              description={alertModalDescription}
              deleteFunction={deleteProduct}
            >
              <Trash className="w-5 h-5 hover:text-red-700" />
            </AlertModal>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">
              Deletar {tab === "produto" ? "Produto" : "Live"}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default CellActions;
