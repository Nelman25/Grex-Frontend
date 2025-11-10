import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import UserAvatar from "@/components/UserAvatar";
import { useFetchWorkspaceMembersQuery } from "@/features/workspace/hooks/queries/useFetchWorkspaceMembersQuery";
import { type PropsWithChildren } from "react";
import { useParams } from "react-router";
import { useAssignTaskMemberMutation } from "../hooks/mutations/useAssignTaskMemberMutation";
import { useFetchTaskAssigneesQuery } from "../hooks/queries/useFetchTaskAssigneesQuery";
import { toast } from "sonner";
import type { WorkspaceMember } from "@/features/workspace/schemas/workspace.schema";

type Props = PropsWithChildren & {
  id: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  canManageAssignees: boolean;
};

export default function MembersCombobox({ id, open, setOpen, canManageAssignees, children }: Props) {
  const { workspace_id } = useParams();
  const { data: assignees } = useFetchTaskAssigneesQuery(id);
  const { mutate: addAssignee } = useAssignTaskMemberMutation(id);
  const { data: members } = useFetchWorkspaceMembersQuery(Number(workspace_id));

  const availableMembers = members?.filter((member) => !assignees?.some((a) => a.user_id === member.user_id));

  const handleAddAssignee = (member: WorkspaceMember) => {
    addAssignee(member.user_id);
    toast.success(`Assigned ${member.first_name} to this task.`);
  };

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Search member..." />
            <CommandList>
              <CommandEmpty>No members found.</CommandEmpty>
              <CommandGroup title={!canManageAssignees ? "You cannot assign members to this task" : ""}>
                {availableMembers?.map((member) => {
                  const fullname = member.first_name + " " + member.last_name;

                  return (
                    <CommandItem
                      key={member.user_id}
                      disabled={!canManageAssignees}
                      value={fullname}
                      onSelect={() => handleAddAssignee(member)}
                    >
                      <div className="flex space-x-3">
                        <UserAvatar name={fullname} photoUrl={member.profile_picture ?? undefined} />
                        <span>{fullname}</span>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
