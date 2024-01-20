import { cookies } from "next/headers";
import Navbar from "./_components/navbar";
import SidebarWrapper from "./_components/sidebar";
import { currentUser } from "@clerk/nextjs";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  const logged = (
    <SidebarWrapper
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={4}
    >
      {children}
    </SidebarWrapper>
  );
  return (
    <>
      <Navbar />
      <main className="pt-[3.5rem] flex-1">{user ? logged : children}</main>
    </>
  );
}
