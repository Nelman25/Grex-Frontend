import { usePatchSubtaskMutation } from "../hooks/mutations/usePatchSubtaskMutation";
import { useDeleteSubtaskMutation } from "../hooks/mutations/useDeleteSubtaskMutation";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import type { Subtask } from "../schemas/subtask.schema";

type Props = {
  subtask: Subtask;
  task_id: number;
  isLeader: boolean;
  isInvolved: boolean;
  isCreator: boolean;
};

export default function SubtaskItem({ task_id, subtask, isLeader, isInvolved, isCreator }: Props) {
  const { mutate: toggleSubtask } = usePatchSubtaskMutation(task_id);
  const { mutate: deleteSubtask } = useDeleteSubtaskMutation(task_id);

  const canToggle = isLeader || isInvolved;
  const canDelete = isLeader || isCreator;

  const handleDeleteSubtask = () => {
    if (!canDelete) return;

    deleteSubtask(subtask.subtask_id, {
      onSuccess: () => toast.success("Subtask deleted"),
      onError: () => toast.error("Failed to delete subtask"),
    });
  };

  const handleToggleSubtask = () => {
    if (!canToggle) return;

    toggleSubtask(
      { is_done: !subtask.is_done, subtask_id: subtask.subtask_id },
      {
        onSuccess: () => {
          toast.success(subtask.is_done ? "1 subtask marked as incomplete" : "1 subtask completed");
        },
        onError: (err) => toast.error(err.message),
      }
    );
  };

  return (
    <li key={subtask.subtask_id} className="group flex items-center gap-2 px-4">
      <Checkbox className="rounded-sm" checked={subtask.is_done} onCheckedChange={handleToggleSubtask} disabled={!canToggle} />
      <p className={cn("text-sm line-clamp-1", subtask.is_done && "line-through text-muted-foreground")}>{subtask.description}</p>

      <button className={cn(!canDelete && "cursor-not-allowed")} onClick={handleDeleteSubtask} disabled={!canDelete}>
        <Trash className="size-4 text-error/50 hidden group-hover:block" />
      </button>
    </li>
  );
}
