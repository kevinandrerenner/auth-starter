import { SidebarTrigger } from "@/components/ui/sidebar";
import { MoodToggle } from "@/components/custom/ui/MoodToggle";
import Searchbar from "@/components/custom/ui/Searchbar";
import React from "react";

export default function DashboardNavbar() {
  return (
    <>
      <nav className="w-full justify-between backdrop-blur-md bg-background/50  flex border-b items-center py-3 px-4 overflow-hidden">
        <SidebarTrigger />
        <div className="flex items-center gap-4">
          <Searchbar />
          <MoodToggle />
        </div>
      </nav>
    </>
  );
}
