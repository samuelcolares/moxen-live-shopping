import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { Calendar, Radio } from "lucide-react";

type Props = {
  className?: string;
  badgeClassName?: string;
};

type LiveBadgeProps = Props & {
  iconClassName?: string;
};

type LiveScheduledBadge = LiveBadgeProps & {
  dateStart: Date;
};

export const LiveBadge: React.FC<LiveBadgeProps> = ({
  className,
  iconClassName,
  badgeClassName,
}) => (
  <div
    className={cn(
      "absolute top-2 left-2 bg-red-600 flex items-center gap-1 px-2 py-1 rounded-xl shadow-2xl",
      className
    )}
  >
    <Radio className={cn("w-4 h-4 text-white animate-pulse", iconClassName)} />
    <p className={cn("text-sm text-white", badgeClassName)}>LIVE</p>
  </div>
);

export const LiveScheduledBadge: React.FC<LiveScheduledBadge> = ({
  className,
  iconClassName,
  badgeClassName,
  dateStart,
}) => {
  const today = dayjs();
  const liveDateStart = dayjs(dateStart);
  // const sub = +today - +year
  // console.log(Math.ceil(today.diff(year, 'day', true)))
  const timeTo =
    liveDateStart.diff(today, "day", true) > 1
      ? `${Math.floor(liveDateStart.diff(today, "day", true))}D`
      : liveDateStart.diff(today, "hour", true) > 1
      ? `${Math.floor(liveDateStart.diff(today, "hour", true))}H`
      : `${Math.floor(liveDateStart.diff(today, "minute", true))}Min`;

  return (
    <div
      className={cn(
        "absolute top-2 left-2 bg-[#b64409] flex items-center gap-1 px-2 py-1 rounded-xl shadow-2xl",
        className
      )}
    >
      <Calendar className={cn("w-4 h-4 text-white", iconClassName)} />
      <p className={cn("text-sm text-white", badgeClassName)}>
        LIVE EM {timeTo}
      </p>
    </div>
  );
};

export const LiveOverBadge: React.FC<Props> = ({
  className,
  badgeClassName,
}) => (
  <div
    className={cn(
      "absolute top-2 left-2 bg-gray-600 px-2 py-1 rounded-xl shadow-2xl",
      className
    )}
  >
    <p className={cn("text-sm text-white", badgeClassName)}>LIVE ENCERRADA</p>
  </div>
);
