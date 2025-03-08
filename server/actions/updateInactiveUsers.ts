import { prisma } from "@/prisma/prisma";
import { subDays } from "date-fns";

export async function updateInactiveUsers() {
  const twoWeeksAgo = subDays(new Date(), 14);

  try {
    await prisma.user.updateMany({
      where: {
        lastActive: { lt: twoWeeksAgo },
        status: "active",
      },
      data: { status: "inactive" },
    });

    console.log("Inactive users updated");
  } catch (error) {
    console.error("Failed to update inactive users:", error);
  }
}