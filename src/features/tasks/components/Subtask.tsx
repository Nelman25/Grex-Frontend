import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useSubtaskStore } from "@/stores/useSubtasksStore";
import type { Subtask } from "@/types/task";
import { Trash } from "lucide-react";
import { usePatchSubtaskMutation } from "../hooks/mutations/usePatchSubtaskMutation";
import { toast } from "sonner";

type Props = {
  subtask: Subtask;
  task_id: number;
};

export default function SubtaskItem({ task_id, subtask }: Props) {
  // THIS WILL BE A FUNCTION THAT TRIGGERS A PATCH REQUEST FOR TOGGLING is_done FIELD IN THE SERVER
  const { mutate: toggleSubtask, error } = usePatchSubtaskMutation(
    task_id,
    subtask.subtask_id
  );

  const deleteSubtask = useSubtaskStore((state) => state.deleteSubtask);

  if (error) toast(error.message);

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
