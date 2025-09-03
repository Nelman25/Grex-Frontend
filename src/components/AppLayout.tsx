import { Outlet } from "react-router";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider } from "./ui/sidebar";

export default function AppLayout() {
  return (
    <SidebarProvider className="flex">
      <AppSidebar />
      <main className="flex-1 max-h-screen overflow-auto">
        {/* <MainHeader /> */}
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
