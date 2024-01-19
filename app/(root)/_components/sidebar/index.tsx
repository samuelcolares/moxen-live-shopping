"use client";
import React from "react";

import { cn } from "@/lib/utils";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sidebar } from "./nav";
import { TooltipProvider } from "@/components/ui/tooltip";
import { asideNavbarLinks } from "@/routes";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine } from "lucide-react";

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
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full flex-1"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}

          minSize={navCollapsedSize+1}
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
            "transition-all duration-100 bg-[#1f2937] shadow-md shadow-black/70 min-w-[170px] max-w-[180px]",
            isCollapsed && "min-w-[50px] max-w-[50px] duration-300 ease-in-out"
          )}
        >
          <Sidebar
            isCollapsed={isCollapsed}
            links={asideNavbarLinks}
          />
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
