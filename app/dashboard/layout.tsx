import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/ui/AppSidebar";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import DashboardNavbar from "@/components/custom/ui/DashboardNavbar";

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
    <div>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar session={session} />
        <SidebarInset
          className={"flex w-full flex-col overflow-auto"}
        >
          <div className=" absolute top-0 left-0 w-full max-w-screen z-50">
            <DashboardNavbar />
          </div>
          <div className={"w-full mt-14"}>
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
