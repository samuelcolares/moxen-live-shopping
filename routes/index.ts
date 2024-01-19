import { CalendarCheck, Home, LucideIcon, Package, PenBoxIcon, Radio, SquareUserRound, Tv } from "lucide-react";

export type LinkProp = {
  title: string;
  icon: LucideIcon;
  href: string;
};

export const asideNavbarLinks: LinkProp[] = [
  {
    title: "Início",
    icon: Home,
    href: "/",
  },
  {
    title: "Seu Canal",
    icon: SquareUserRound,
    href: "/canal",
  },
  {
    title: "Agendar live",
    icon: CalendarCheck,
    href: "/canal/live/novaLive",
  },
  {
    title: "Cadastrar produto",
    icon: PenBoxIcon,
    href: "/canal/produto/novoProduto",
  },
];
