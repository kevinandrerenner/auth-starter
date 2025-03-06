import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/custom/ui/AppSidebar";
import { cookies } from "next/headers";
import { auth } from "@/auth";


export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  const session = await auth();
  return (
    <SidebarProvider defaultOpen={defaultOpen}>

    <AppSidebar session={session}/>
      <main>
        <SidebarTrigger />
        { children }
      </main>
    </SidebarProvider>
  )
}
