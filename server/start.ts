import "@/server/jobs"; // Ensures cron jobs start
import { updateInactiveUsers } from "@/server/actions/users";

async function init() {
  console.log("🚀 Server is starting...");

  // Run once at startup
  await updateInactiveUsers();
  console.log("✅ Checked for inactive users on startup.");
}

init().then(() => {});