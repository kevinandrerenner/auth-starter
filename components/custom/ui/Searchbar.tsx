import { Command, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function Searchbar() {
  return (
    <div>
      <div className="relative">
        
      <Input type="text" placeholder="Search..." className="pl-9" />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Badge
        variant="secondary"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
      >
        <Command/>K
      </Badge>
      </div>
    </div>
  )
}