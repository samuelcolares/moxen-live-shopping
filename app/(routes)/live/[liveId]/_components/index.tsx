import React from "react";
import Image from "next/image";

import { ProductCard } from "@/components/ui/product-card";
import EditLiveModal from "@/components/modal/edit-live-modal";
import { LiveBadge, LiveOverBadge } from "@/components/ui/badge";
import ProfileAvatar from "@/components/ui/profile-avatar";

import { Live, User } from "@prisma/client";
import { ParsedLiveProduct } from "@/types";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
dayjs.extend(utc);
dayjs.extend(timezone);

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
  const date = dayjs().tz("America/Sao_Paulo");
  const dateStart = dayjs(live.dateStart);
  const dateEnd = dayjs(live.dateEnd);
  const parsedProducts = JSON.parse(
    live.products as string
  ) as ParsedLiveProduct[];

  const isLive = +date > +dateStart && +date < +dateEnd && (
    <LiveBadge
      className="top-4 left-4 gap-2"
      iconClassName="w-6 h-6"
      badgeClassName="text-base"
    />
  );
  const LiveOver = +date > +dateEnd && (
    <LiveOverBadge className="top-4 left-4" badgeClassName="text-base" />
  );

  return (
    <section className="w-full p-4 flex justify-center">
      <div className="max-w-5xl w-full space-y-4">
        <div className="relative aspect-video overflow-hidden rounded-md bg-white/30">
          <Image fill src={live.thumbnailUrl} alt={live.title} />
          {isLive}
          {LiveOver}
        </div>

        <div className="flex gap-4">
          <div className="relative rounded-full overflow-hidden aspect-square min-w-16 h-16 bg-gray-900">
            <ProfileAvatar
              className="w-full h-full"
              alt={live.username}
              src={live.userImg}
              fallback={live.username[0].toUpperCase()}
            />
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl max-w-4/5 truncate" title={live.title}>
                {live.title}
              </h2>
              {liveOwner && <EditLiveModal initialData={live} />}
            </div>
            <h3 className="text-lg text-muted-foreground">@{user.username}</h3>
            <ul className="text-md flex gap-2 text-muted-foreground">
              <li>{dateStart.format("DD/MM - HH:mm")}</li>
              <li>até</li>
              <li>{dateEnd.format("DD/MM - HH:mm")}</li>
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
          <section className="grid grid-cols-3 gap-4">
            {parsedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </section>
        </div>
      </div>
    </section>
  );
};

export default LiveFullDetailsPage;
