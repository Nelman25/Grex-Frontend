import { Outlet } from "react-router";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider } from "./ui/sidebar";
import MainHeader from "./MainHeader";

export default function AppLayout() {
  return (
    <SidebarProvider
      className="flex"
      style={{
        "--sidebar-width": "20rem",
        "--sidebar-width-mobile": "20rem",
      }}
    >
      <AppSidebar />
      <main className="flex-1">
        <MainHeader />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
