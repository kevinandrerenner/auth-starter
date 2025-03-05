import { auth } from "@/auth";

export default async function DashboardPage () {
  const session = await auth();
  console.log(session);
  return (
    <div>DashboardPage</div>
  );
};
