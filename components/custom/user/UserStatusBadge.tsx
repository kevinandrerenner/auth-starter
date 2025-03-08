import { Badge } from "@/components/ui/badge";

export default function UserStatusBadge({ status }: { status: "active" | "suspended" | "inactive" | "deactivated" }) {
  const statusStyles = {
    active: {
      text: "text-green-500",
      bg: "bg-green-500/15",
    },
    suspended: {
      text: "text-red-500",
      bg: "bg-red-500/15",
    },
    inactive: {
      text: "text-muted-foreground",
      bg: "bg-gray-500/15",
    },
    deactivated: {
      text: "text-muted-foreground",
      bg: "bg-gray-500/15",
    },
  };

  const { text, bg } = statusStyles[status] || statusStyles.inactive; // Default to inactive if undefined

  return (
    <Badge className={`flex items-center gap-1 px-3 py-1 rounded-md ${text} ${bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${text} bg-current`} /> {/* Status dot */}
      {status.charAt(0).toUpperCase() + status.slice(1)} {/* Capitalize first letter */}
    </Badge>
  );
}