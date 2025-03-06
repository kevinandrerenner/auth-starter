import { Badge } from "@/components/ui/badge";

export default function RoleBadge({ user }: { user: any }) {
  return (
    <div>
      <Badge
        className="py-0 px-1.5"
        variant={
          user?.role === "admin"
            ? "destructive"
            : user?.role === "guest"
              ? "outline"
              : "secondary"
        }
      >
        {user?.role ?? "guest"}
      </Badge>
    </div>
  );
}
