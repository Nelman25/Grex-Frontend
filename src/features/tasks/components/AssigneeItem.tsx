import { useAssigneeStore } from "@/stores/useAssigneesStore";
import type { TaskAssignee } from "@/types/task";
import { XIcon } from "lucide-react";

export default function AssigneeItem({ assignee }: { assignee: TaskAssignee }) {
  // TODO: POST request for adding an assignee to the task
  // invalidate query: ["assignees", { task_id: id }]

  // DELETE request for removing a member as assignee to task
  // invalidate query or remove on cache: ["assignees", { task_id: id }]

  const removeAssignee = useAssigneeStore((state) => state.removeAssignee);

  return (
    <div className="text-sm flex space-x-3 items-center p-1 rounded-md bg-blue-500/20">
      <img
        src={assignee.avatar}
        alt="asignned member"
        className="size-7 rounded-full"
      />
      <span className="text-dark-text font-medium">{assignee.name}</span>
      <button
        onClick={() => removeAssignee(assignee.user_id, assignee.task_id)}
      >
        <XIcon className="size-4 text-dark-text" />
      </button>
    </div>
  );
}
