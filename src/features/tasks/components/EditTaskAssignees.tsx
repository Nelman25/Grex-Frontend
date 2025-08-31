import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/context/auth-context";
import { useFetchWorkspaceQuery } from "@/features/workspace/hooks/queries/useFetchWorkspaceQuery";
import { memo, useState } from "react";
import { useParams } from "react-router";
import { useAssignTaskMemberMutation } from "../hooks/mutations/useAssignTaskMemberMutation";
import { useFetchTaskAssigneesQuery } from "../hooks/queries/useFetchTaskAssigneesQuery";
import AssigneeItem from "./AssigneeItem";

function EditTaskAssignees({ id }: { id: number }) {
  const [newAssignee, setNewAssignee] = useState("");
  const { user } = useAuth();
  const { workspace_id } = useParams();
  const { data: assignees } = useFetchTaskAssigneesQuery(id);
  const { mutate: addAssignee } = useAssignTaskMemberMutation(id);
  const { data: project } = useFetchWorkspaceQuery(
    Number(workspace_id),
    user?.user_id
  );

  const members = project?.members;

  const availableMembers = members?.filter((member) => {
    const fullname = member.first_name + " " + member.last_name;
    return (
      !assignees?.some((a) => a.user_id === member.user_id) &&
      fullname
        .replace(/\s+/g, "")
        .toLowerCase()
        .includes(newAssignee.replace(/\s+/g, "").toLowerCase())
    );
  });

  const handleAddAssignee = () => {
    const assignee = availableMembers?.[0];

    if (!assignee) return;

    addAssignee(assignee.user_id);
    setNewAssignee("");
  };

  return (
    <div className="grid gap-4">
      <Label>Assignee/s</Label>
      <div className="flex gap-2 flex-wrap">
        {assignees?.map((assignee) => (
          <AssigneeItem key={assignee.user_id} id={id} assignee={assignee} />
        ))}
      </div>

      <div className="relative">
        <Input
          className="text-sm"
          value={newAssignee}
          onChange={(e) => setNewAssignee(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddAssignee();
            }
          }}
        />
        {newAssignee && (
          <div className="flex flex-col items-start bg-dark-muted px-4 mt-1 rounded absolute">
            {availableMembers?.map((member) => (
              <button
                className="w-full bg-dark-muted rounded my-2 flex gap-2"
                onClick={() => addAssignee(member.user_id)}
              >
                <UserAvatar
                  photoUrl={member.profile_picture ?? undefined}
                  name={member.first_name + " " + member.last_name}
                />
                <span>
                  {member.first_name} {member.last_name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(EditTaskAssignees);
