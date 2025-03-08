import { SidebarTrigger } from "@/components/ui/sidebar";
import { MoodToggle } from "@/components/custom/ui/MoodToggle";
import { Input } from "@/components/ui/input";
import { Command, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DashboardNavbar() {
  return (
    <nav className="flex items-center justify-between py-3 px-4">
      <SidebarTrigger />
      <div className="relative flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Badge
            variant="secondary"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          >
            <Command />K
          </Badge>
          <Input type="text" placeholder="Search..." className="pl-9" />
        </div>
        <MoodToggle />
      </div>
    </nav>
  );
}
