import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useSubtaskStore } from "@/stores/useSubtasksStore";
import type { Subtask } from "@/types/task";

type Props = {
  subtasks: Subtask[];
};

export default function KanbanSubtasksList({ subtasks }: Props) {
  // This will be a PATCH request for toggling the is_done field of a subtask
  const toggleSubtask = useSubtaskStore((state) => state.toggleSubtask);

  return (
    <ul>
      {subtasks.map((subtask) => (
        <li key={subtask.subtask_id} className="flex items-center gap-2 px-4">
          <Checkbox
            className=""
            checked={subtask.is_done}
            onCheckedChange={() => toggleSubtask(subtask.subtask_id)}
          />
          <p
            className={cn(
              "text-sm line-clamp-1",
              subtask.is_done && "line-through text-muted-foreground"
            )}
          >
            {subtask.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
