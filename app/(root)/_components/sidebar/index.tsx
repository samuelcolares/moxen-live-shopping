"use client";
import React from "react";

import { cn } from "@/lib/utils";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sidebar } from "./nav";
import { CalendarCheck, Home, Package, Radio } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";

type WrapperProps = {
  children: React.ReactNode;
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
};

const SidebarWrapper: React.FC<WrapperProps> = ({
  children,
  defaultCollapsed = true,
  navCollapsedSize,
  defaultLayout = [10, 90],
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  React.useEffect(() => {
    console.log(isCollapsed);
  }, [isCollapsed]);
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full flex-1 "
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          maxSize={15}
          minSize={12}
          collapsible={true}
          collapsedSize={navCollapsedSize}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            "bg-[#1f2937] transition-all duration-100",
            isCollapsed && "min-w-[50px] duration-300 ease-in-out"
          )}
        >
          <Sidebar
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Home",
                icon: Home,
                href: "/",
              },
              {
                title: "Suas lives",
                icon: Radio,
                href: "/lives",
              },
              {
                title: "Agendar live",
                icon: CalendarCheck,
                href: "/lives/novaLive",
              },
              {
                title: "Seus produtos",
                icon: Package,
                href: "/produtos",
              },
              {
                title: "Cadastrar produto",
                icon: CalendarCheck,
                href: "/produtos/novoProduto",
              },
            ]}
          />
          <Separator />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default SidebarWrapper;
