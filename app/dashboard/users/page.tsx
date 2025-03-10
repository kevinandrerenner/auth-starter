import { UsersTable } from "@/components/custom/user/UsersTable";
import { auth } from "@/auth";
import React from "react";

export default async function UsersPage() {
  const session = await auth();
  return (
    <div className="bg-background">
      <div className="p-5 w-full">
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="">
          <UsersTable session={session} />
        </div>
      </div>
    </div>
  );
}
