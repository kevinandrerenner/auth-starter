import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/ui/AppSidebar";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import DashboardNavbar from "@/components/custom/ui/DashboardNavbar";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const session = await auth();
  return (
    <div className="w-screen">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar session={session} />
        <div className="w-full">
          <DashboardNavbar />
          <Separator />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
