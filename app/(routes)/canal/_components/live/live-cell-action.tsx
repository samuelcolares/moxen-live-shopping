import Link from "next/link";
import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AlertModal from "@/components/modal/alert-dialog-modal";
import LiveDetailsModal from "@/components/modal/live-details-modal";
import { toast } from "sonner";
import { ExternalLink, PencilIcon, Trash } from "lucide-react";

import { onDeleteLive } from "@/actions/live-actions";

import { Live } from "@prisma/client";

type CellActionsProps = {
  data: Live;
};

const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const deleteLive = () => {
    try {
      onDeleteLive(data.id)
        .then(() => toast.warning("Live deletada!"))
        .catch(() => toast.error("Error ao deletar o live."));
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
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/live/${data.id}`}>
              <ExternalLink className="w-5 h-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Visitar página da Live</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <LiveDetailsModal
              products={data.products}
              liveDescription={data.description}
              title={data.title}
              thumbnail={data.thumbnailUrl}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Ver Detalhes</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/canal/live/${data.id}`}>
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
              deleteFunction={deleteLive}
            >
              <Trash className="w-5 h-5 hover:text-red-700" />
            </AlertModal>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Deletar Live</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default CellActions;
