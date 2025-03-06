import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({ user }: { user: any }) {
  return (
    <div>
      <Avatar className={"h-8 w-8 rounded-lg"}>
        <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
        <AvatarFallback className="rounded-lg">
          {user?.name?.charAt(0).toUpperCase()}
          {user?.name?.charAt(1).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
