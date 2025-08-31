import { usePatchSubtaskMutation } from "../hooks/mutations/usePatchSubtaskMutation";
import { useDeleteSubtaskMutation } from "../hooks/mutations/useDeleteSubtaskMutation";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import type { Subtask } from "@/types/task";

type Props = {
  subtask: Subtask;
  task_id: number;
};

export default function SubtaskItem({ task_id, subtask }: Props) {
  const { mutate: toggleSubtask, error: editSubtaskError } =
    usePatchSubtaskMutation(task_id, subtask.subtask_id);
  const { mutate: deleteSubtask, error: deleteSubtaskError } =
    useDeleteSubtaskMutation(task_id);

  if (editSubtaskError || deleteSubtaskError)
    toast((editSubtaskError ?? deleteSubtaskError)?.message);

  return (
    <li key={subtask.subtask_id} className="group flex items-center gap-2 px-4">
      <Checkbox
        checked={subtask.is_done}
        onCheckedChange={() => toggleSubtask({ is_done: !subtask.is_done })}
      />
      <p
        className={cn(
          "text-sm line-clamp-1",
          subtask.is_done && "line-through text-muted-foreground"
        )}
      >
        {subtask.description}
      </p>
      <button onClick={() => deleteSubtask(subtask.subtask_id)}>
        <Trash className="size-4 text-error/50 hidden group-hover:block" />
      </button>
    </li>
  );
}
