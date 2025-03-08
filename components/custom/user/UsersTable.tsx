"use client";

import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { FileEdit, MoreHorizontal, Shield, Trash2, User, UserMinus, UserX } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/custom/ui/DataTable";
import UserAvatar from "@/components/custom/user/UserAvatar";
import UserStatusBadge from "@/components/custom/user/UserStatusBadge";
import UserRoleDropdown from "@/components/custom/user/UserRoleDropdown";

import { updateUserRole, updateUserStatus, deleteUser } from "@/server/actions/users";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  image?: string;
  createdAt: Date;
};

export function UsersTable({ session }: { session: any }) {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  // ✅ Admin-Check
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  const handleRoleChange = (userId: string, newRole: string) => {
    if (!isAdmin) return;
    startTransition(async () => {
      const result = await updateUserRole(userId, newRole);
      if (result.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
        );
      }
    });
  };

  const handleStatusChange = (userId: string, newStatus: "active" | "suspended") => {
    if (!isAdmin) return;
    startTransition(async () => {
      const result = await updateUserStatus(userId, newStatus);
      if (result.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, status: newStatus } : user
          )
        );
      }
    });
  };

  const confirmDeleteUser = () => {
    if (!userToDelete || !isAdmin) return;
    startTransition(async () => {
      const result = await deleteUser(userToDelete);
      if (result.success) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
      }
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    });
  };

  if (loading) {
    return <div className="text-center py-6">Loading users...</div>;
  }

  const columns: ColumnDef<UserType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="mx-2"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="mx-2"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "avatar",
      header: "Avatar",
      cell: ({ row }) => <UserAvatar user={row.original} />,
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
    },
    {
      accessorKey: "role",
      header: "Role",
      enableSorting: true,
      cell: ({ row }) => {
        // Define valid role keys
        type RoleKey = keyof typeof roleDisplay;

        // Safe role lookup with TypeScript support
        const role = row.original.role as RoleKey;
        const roleDisplay = {
          admin: { icon: <Shield className="mr-1 h-4 w-4" />, label: "Admin" },
          editor: { icon: <FileEdit className="mr-1 h-4 w-4" />, label: "Editor" },
          user: { icon: <User className="mr-1 h-4 w-4" />, label: "User" },
          guest: { icon: <UserMinus className="mr-1 h-4 w-4" />, label: "Guest" },
        } as const; // Ensures TypeScript knows it's readonly

        return isAdmin ? (
          <UserRoleDropdown
            userId={row.original.id}
            currentRole={row.original.role}
            onRoleChange={handleRoleChange}
          />
        ) : (
          <div className="flex items-center px-2 py-1 text-foreground w-fit">
            {roleDisplay[role]?.icon}
            <span className="ml-1 font-medium text-foreground">{roleDisplay[role]?.label}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: true,
      cell: ({ row }) => <UserStatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "createdAt",
      header: "Joined",
      enableSorting: true,
      sortingFn: "datetime",
      cell: ({ row }) => format(row.original.createdAt, "MMM d, yyyy"),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          isAdmin && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleStatusChange(user.id, user.status === "active" ? "suspended" : "active")}>
                  <UserX className="mr-2 h-4 w-4" />
                  {user.status === "suspended" ? "Activate" : "Suspend"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={() => {
                  setUserToDelete(user.id);
                  setDeleteDialogOpen(true);
                }}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        );
      },
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={users} />

      {/* ⚠️ Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteUser}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}