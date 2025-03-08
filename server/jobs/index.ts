import cron from "node-cron";
import { updateInactiveUsers } from "@/server/actions/users";

console.log("⏳ Starting scheduled jobs...");

// Runs every day at **midnight** (00:00)
cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Running daily job: Updating inactive users...");
  await updateInactiveUsers();
  console.log("✅ Inactive users updated!");
});