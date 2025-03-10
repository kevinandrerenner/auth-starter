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

export async function updateUserStatus(
  userId: string,
  newStatus: "active" | "suspended",
) {
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

export async function getUserStats() {
  const now = new Date();
  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  // const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const [currentUsers, lastMonthUsers, currentActive, lastMonthActive] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: {
          createdAt: { gte: startOfLastMonth, lt: startOfCurrentMonth },
        },
      }),
      prisma.user.count({ where: { status: "active" } }),
      prisma.user.count({
        where: {
          status: "active",
          createdAt: { gte: startOfLastMonth, lt: startOfCurrentMonth },
        },
      }),
    ]);

  function calculatePercentage(current: number, previous: number) {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  }

  function calculateDifference(current: number, previous: number) {
    if (previous === 0) return 0;
    return current - previous;
  }

  return {
    totalUsers: currentUsers,
    totalUsersChangePercentage: calculatePercentage(
      currentUsers,
      lastMonthUsers,
    ),
    totalUsersChange: calculateDifference(currentUsers, lastMonthUsers),
    activeUsers: currentActive,
    activeUsersChangePercentage: calculatePercentage(
      currentActive,
      lastMonthActive,
    ),
    activeUsersChange: calculateDifference(
      currentActive,
      lastMonthActive,
    ),
  };
}
