import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, FileEdit, User, UserMinus } from "lucide-react";

export default function UserRoleDropdown({ userId, currentRole, onRoleChange }: {
  userId: string;
  currentRole: string;
  onRoleChange: (userId: string, newRole: string) => void;
}) {
  return (
    <Select defaultValue={currentRole} onValueChange={(value) => onRoleChange(userId, value)}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">
          <Shield className="mr-1 h-4 w-4" /> Admin
        </SelectItem>
        <SelectItem value="editor">
          <FileEdit className="mr-1 h-4 w-4" /> Editor
        </SelectItem>
        <SelectItem value="user">
          <User className="mr-1 h-4 w-4 " /> User
        </SelectItem>
        <SelectItem value="guest">
          <UserMinus className="mr-1 h-4 w-4" /> Guest
        </SelectItem>
      </SelectContent>
    </Select>
  );
}