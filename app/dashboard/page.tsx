import React from "react";
import DashboardCards from "@/components/custom/user/cards/DashboardCards";

export default function DashboardPage() {
  return (
    <div>
      <div className="flex flex-col gap-5 p-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <DashboardCards/>
      </div>
    </div>
  );
}
