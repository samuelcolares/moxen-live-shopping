import { Live } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";
import ProfileAvatar from "@/components/ui/profile-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

export const LiveSearchCard = ({ live }: { live: Live }) => (
  <Link href={`/live/${live.id}`}>
    <div className="flex lg:flex-row flex-col p-0 gap-4">
      <div className="relative overflow-hidden bg-gray-800 aspect-video lg:min-w-80 lg:w-80 min-w-64 w-64 h-full rounded-md">
        <Image fill src={live.thumbnailUrl} alt={live.title} />
      </div>
      <div className="w-full flex flex-col">
        <p className="lg:text-2xl text-lg font-semibold">{live.title}</p>

        <ul className="lg:text-base text-sm flex gap-2 text-muted-foreground">
          <li>{dayjs(live.dateStart).format("DD/MM - HH:mm")}</li>
          <li>até</li>
          <li>{dayjs(live.dateEnd).format("DD/MM - HH:mm")}</li>
        </ul>

        <div className="flex items-center gap-2 my-2">
          <ProfileAvatar
            className="aspect-square h-10 w-10 overflow-hidden rounded-full"
            alt={live.username}
            src={live.userImg}
            fallback={live.username[0].toUpperCase()}
          />
          <p className="lg:text-base text-sm text-muted-foreground">@{live.username}</p>
        </div>

        <ScrollArea className="hidden lg:block max-w-2xl h-14">{live.description}</ScrollArea>
      </div>
    </div>
  </Link>
);
