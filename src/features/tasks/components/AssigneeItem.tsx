import UserAvatar from "@/components/UserAvatar";
import type { TaskAssignee } from "@/types/task";
import { XIcon } from "lucide-react";
import { useUnassignTaskMemberMutation } from "../hooks/mutations/useUnassignTaskMemberMutation";

export default function AssigneeItem({
  assignee,
  id,
}: {
  assignee: TaskAssignee;
  id: number;
}) {
  const { mutate: removeAssignee } = useUnassignTaskMemberMutation(id);

  return (
    <div className="text-sm flex space-x-3 items-center p-1 rounded-md bg-blue-500/20">
      <UserAvatar photoUrl={assignee.avatar} name={assignee.name} />
      <span className="text-dark-text font-medium">{assignee.name}</span>
      <button onClick={() => removeAssignee(assignee.user_id)}>
        <XIcon className="size-4 text-dark-text" />
      </button>
    </div>
  );
}
