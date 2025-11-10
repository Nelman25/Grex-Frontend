import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/UserAvatar";
import { MoreVertical } from "lucide-react";
import { useParams } from "react-router";
import { useKickMemberMutation } from "../hooks/mutations/useKickMemberMutation";
import { usePromoteToLeaderMutation } from "../hooks/mutations/usePromoteToLeaderMutation";
import { toast } from "sonner";
import type { WorkspaceMember } from "../schemas/workspace.schema";

export default function WorkspaceMembersList({ members }: { members: WorkspaceMember[] }) {
  const { workspace_id } = useParams();
  const workspaceId = Number(workspace_id);
  const { mutate: kickMember } = useKickMemberMutation(workspaceId);
  const { mutate: promoteToLeader } = usePromoteToLeaderMutation(workspaceId);

  const handlePromoteToLeader = (member: WorkspaceMember) => {
    promoteToLeader(member.user_id);
    toast.success(`${member.first_name} ${member.last_name} is now a leader`);
  };

  const handleKickMember = (member: WorkspaceMember) => {
    kickMember(member.user_id);
    toast.success(`Removed ${member.first_name} ${member.last_name} from the workspace.`);
  };

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
                <>
                  <DropdownMenuItem onClick={() => handlePromoteToLeader(member)}>Make leader</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600" onClick={() => handleKickMember(member)}>
                    Kick Member
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      ))}
    </ul>
  );
}
