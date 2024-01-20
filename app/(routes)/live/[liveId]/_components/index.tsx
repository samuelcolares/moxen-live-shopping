import React from "react";
import { Live, User } from "@prisma/client";
import { ParsedLiveProduct } from "@/types";
import Image from "next/image";
import dayjs from "dayjs";
import { ProductCard } from "@/components/ui/product-card";
import EditLiveModal from "@/components/edit-live-modal";

type LivePageProps = {
  live: Live;
  user: User;
  liveOwner: boolean;
};

const LiveFullDetailsPage: React.FC<LivePageProps> = ({
  live,
  user,
  liveOwner,
}) => {
  const date = (date: Date) => dayjs(date).format("DD/MM - HH:mm");
  const parsedProducts = JSON.parse(
    live.products as string
  ) as ParsedLiveProduct[];

  return (
    <section className="w-full p-4 flex justify-center">
      <div className="max-w-5xl w-full space-y-4">
        <div className="relative aspect-video overflow-hidden rounded-md bg-white/30">
          <Image fill src={live.thumbnailUrl} alt={live.title} />
        </div>

        <div className="flex gap-4">
          <div className="relative rounded-full overflow-hidden aspect-square min-w-16 h-16 bg-gray-900">
            <Image
              fill
              src={user.imageUrl}
              alt={user.username}
              className="object-cover"
            />
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl max-w-4/5 truncate" title={live.title}>
                {live.title}
              </h2>
              {liveOwner && <EditLiveModal initialData={live}/>}
            </div>
            <h3 className="text-lg text-muted-foreground">@{user.username}</h3>
            <ul className="text-md flex gap-2 text-muted-foreground">
              <li>{date(live.dateStart)}</li>
              <li>até</li>
              <li>{date(live.dateEnd)}</li>
            </ul>
          </div>
        </div>

        <div className="w-full !mt-8">
          <h3 className="text-xl mb-2">Descrição:</h3>
          <article className="rounded-md border p-2">
            {live.description}
          </article>
        </div>

        <div className="w-full !mt-8">
          <h3 className="text-xl mb-2">
            {parsedProducts.length === 1
              ? `Produto ofertado nesta live:`
              : `Produtos ofertados nesta live (${parsedProducts.length}):`}
          </h3>
          <article className="p-2 grid grid-cols-3 gap-4">
            {parsedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </article>
        </div>
      </div>
    </section>
  );
};

export default LiveFullDetailsPage;
