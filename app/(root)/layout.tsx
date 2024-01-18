import { cookies } from "next/headers";
import Navbar from "./_components/navbar";
import SidebarWrapper from "./_components/sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  return (
    <main className="lg:min-h-screen min-h-dvh flex flex-col">
      <Navbar />
      <SidebarWrapper
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
      >
        {children}
      </SidebarWrapper>
    </main>
  );
}
