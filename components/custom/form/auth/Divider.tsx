import { Separator } from "@/components/ui/separator";

export function Divider() {
  return (
    <div className="relative flex items-center space-x-2">
      <Separator className="flex-1 muted-foreground" />
      <span className="text-sm text-muted-foreground">
        or continue with
      </span>
      <Separator className="flex-1 muted-foreground" />
    </div>
  );
}
