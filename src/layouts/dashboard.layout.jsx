import { Outlet } from "react-router";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/clerk-react";

export default function DashboardLayout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="p-4 w-full bg-slate-200">
          <div className="flex justify-between items-center mb-4">
            <SidebarTrigger />
            <div className="mr-4">
              <UserButton
                  showName
                  appearance={{
                      elements: {
                          userButtonOuterIdentifier: "text-slate-900 font-semibold",
                      },
                  }}
              />
            </div>
          </div>
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
}
