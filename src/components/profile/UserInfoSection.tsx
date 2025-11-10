// components/ProfileCard/UserInfoSection.tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { User } from "@/schemas/profile.schema";
import { PencilIcon } from "lucide-react";

interface UserInfoSectionProps {
  user: User;
  isEditing: boolean;
  onFieldChange: (field: keyof User, value: string) => void;
  onEditToggle: () => void;
}

export default function UserInfoSection({ user, isEditing, onFieldChange, onEditToggle }: UserInfoSectionProps) {
  if (isEditing) {
    return (
      <div className="space-y-4 w-full">
        <div className="grid grid-cols-2 gap-4">
          <Input
            value={user.first_name}
            onChange={(e) => onFieldChange("first_name", e.target.value)}
            className="text-center"
            placeholder="First Name"
          />
          <Input
            value={user.last_name}
            onChange={(e) => onFieldChange("last_name", e.target.value)}
            className="text-center"
            placeholder="Last Name"
          />
        </div>
        <Input
          value={user.role ?? ""}
          onChange={(e) => onFieldChange("role", e.target.value)}
          className="text-center"
          placeholder="Role"
        />
        <Textarea
          value={user.bio ?? ""}
          onChange={(e) => onFieldChange("bio", e.target.value)}
          className="text-center min-h-[100px]"
          placeholder="Bio"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full text-center">
      <h2 className="text-2xl font-semibold mb-1">
        {user.first_name} {user.last_name}
      </h2>
      <p className="text-muted-foreground">{user.role || "Role not set."}</p>
      <p className="text-sm mt-4 text-muted-foreground">{user.bio || "No bio provided."}</p>

      <button onClick={onEditToggle} className="absolute -right-2 top-0 p-2 hover:bg-muted/50 rounded-full transition-colors">
        <PencilIcon className="size-4 text-muted-foreground hover:text-foreground" />
      </button>
    </div>
  );
}
