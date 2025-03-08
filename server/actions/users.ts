"use server";

import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { Role } from "@prisma/client"; // Import Role Enum from Prisma

export async function updateUserRole(userId: string, newRole: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole as Role },
    });
    revalidatePath("/dashboard/users"); // reload page
    return { success: true };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, message: "Failed to update role" };
  }
}

export async function updateInactiveUsers() {
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14); // 14 days ago

  try {
    const updatedUsers = await prisma.user.updateMany({
      where: {
        lastActive: { lt: twoWeeksAgo },
        status: "active",
      },
      data: {
        status: "inactive",
      },
    });

    console.log(`Updated ${updatedUsers.count} users to inactive`);
  } catch (error) {
    console.error("Failed to update inactive users", error);
  }
}

export async function updateUserStatus(userId: string, newStatus: "active" | "suspended") {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { status: newStatus },
    });
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Error updating user status:", error);
    return { success: false, message: "Failed to update status" };
  }
}

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, message: "Failed to delete user" };
  }
}