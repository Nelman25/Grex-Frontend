import UserAvatar from "@/components/UserAvatar";
import type { TaskAssignee } from "@/types/task";
import { XIcon } from "lucide-react";
import { useUnassignTaskMemberMutation } from "../hooks/mutations/useUnassignTaskMemberMutation";
import { toast } from "sonner";

export default function AssigneeItem({ assignee, id }: { assignee: TaskAssignee; id: number }) {
  const { mutate: removeAssignee } = useUnassignTaskMemberMutation(id);

  const handleRemoveAssignee = () => {
    removeAssignee(assignee.user_id);
    toast.success(`Removed ${assignee.name} from the task`);
  };

  return (
    <div className="text-sm flex space-x-3 items-center p-1 rounded-md bg-dark-muted">
      <UserAvatar photoUrl={assignee.avatar} name={assignee.name} />
      <span className="text-dark-text font-medium">{assignee.name}</span>
      <button onClick={handleRemoveAssignee} className="hover:bg-dark-subtle p-1 rounded group">
        <XIcon className="size-4 text-dark-text group-hover:text-dark-muted" />
      </button>
    </div>
  );
}
