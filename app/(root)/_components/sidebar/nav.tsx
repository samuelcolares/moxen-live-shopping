"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    icon: LucideIcon;
    href: string;
  }[];
}

export function Sidebar({ links, isCollapsed }: NavProps) {
  const pathname = usePathname();

  return (
    <aside
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 "
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <CollapsedLinks
              key={index}
              Icon={link.icon}
              href={link.href}
              title={link.title}
              pathname={pathname}
            />
          ) : (
            <ExtendedLinks
              key={index}
              Icon={link.icon}
              href={link.href}
              title={link.title}
              pathname={pathname}
            />
          )
        )}
      </nav>
    </aside>
  );
}

type LinksProps = {
  href: string;
  pathname: string;
  title: string;
  Icon: LucideIcon;
};

const CollapsedLinks: React.FC<LinksProps> = ({
  href,
  pathname,
  title,
  Icon,
}) => {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9 hover:bg-gray-600",
            href === pathname &&
              "dark:bg-gray-500 dark:text-white dark:hover:text-white"
          )}
        >
          <Icon className="h-5 w-5" />
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="ml-1 text-md">
        {title}
      </TooltipContent>
    </Tooltip>
  );
};

const ExtendedLinks: React.FC<LinksProps> = ({
  href,
  pathname,
  title,
  Icon,
}) => (
  <Link
    href={href}
    className={cn(
      buttonVariants({ variant: "ghost", size: "sm" }),
      href === pathname &&
        "dark:bg-gray-500 dark:text-white dark:hover:text-white",
      "justify-start hover:bg-gray-600"
    )}
  >
    <Icon className="mr-2 h-5 w-5" />
    {title}
  </Link>
);
