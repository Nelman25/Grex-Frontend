import UserAvatar from "@/components/UserAvatar";
import type { TaskAssignee } from "@/types/task";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import { useUnassignTaskMemberMutation } from "../hooks/mutations/useUnassignTaskMemberMutation";

type Props = {
  assignee: TaskAssignee;
  id: number;
  canManageAssignees?: boolean;
};

export default function AssigneeItem({ assignee, id, canManageAssignees = false }: Props) {
  const { mutate: removeAssignee } = useUnassignTaskMemberMutation(id);

  const handleRemoveAssignee = () => {
    removeAssignee(assignee.user_id, {
      onSuccess: () => toast.success(`Removed ${assignee.name} from the task`),
      onError: (error) => toast.error("Failed to remove assignee", { description: error.message }),
    });
  };

  return (
    <div className="text-sm flex space-x-1 items-center px-1 rounded-xl bg-dark-muted">
      <UserAvatar photoUrl={assignee.avatar} name={assignee.name} />
      <span className="text-dark-text font-medium whitespace-nowrap min-w-20">{assignee.name}</span>
      <button
        onClick={handleRemoveAssignee}
        className={`p-1 ${!canManageAssignees ? "cursor-not-allowed" : ""}`}
        disabled={!canManageAssignees}
        title={!canManageAssignees ? "You don't have permission to remove this assignee" : ""}
      >
        <XIcon className="size-4 text-dark-text" />
      </button>
    </div>
  );
}
