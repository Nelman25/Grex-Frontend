import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import type { WorkspaceMember } from "@/types/member";
import { useKickMemberMutation } from "../hooks/mutations/useKickMemberMutation";
import { useParams } from "react-router";

export default function WorkspaceMembersList({ members }: { members: WorkspaceMember[] }) {
  const { workspace_id } = useParams();
  const { mutate: kickMember } = useKickMemberMutation(Number(workspace_id));

  return (
    <ul className="space-y-2">
      {members.map((member) => (
        <li key={member.user_id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar name={member.first_name + " " + member.last_name} photoUrl={member.profile_picture ?? ""} />
            <div className="flex flex-col leading-tight">
              <div>
                <span>
                  {member.first_name} {member.last_name}
                </span>
                {member.role === "leader" && <span className="text-xs text-primary ml-1">(Leader)</span>}
              </div>
              <span className="text-dark-subtle text-sm">{member.email}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Change Nickname</DropdownMenuItem>
              {member.role !== "leader" && (
                <DropdownMenuItem className="text-red-600" onClick={() => kickMember(member.user_id)}>
                  Kick Member
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      ))}
    </ul>
  );
}
