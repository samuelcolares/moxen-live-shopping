import { cn } from "@/lib/utils";
import { Radio } from "lucide-react";

type Props = {
  className?: string;
  badgeClassName?: string;
};

type LiveBadgeProps = Props & {
  iconClassName?: string;
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
    <Radio className={cn("w-4 h-4", iconClassName)} />
    <p className={cn("text-sm", badgeClassName)}>LIVE</p>
  </div>
);

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
    <p className={cn("text-sm", badgeClassName)}>LIVE ENCERRADA</p>
  </div>
);
