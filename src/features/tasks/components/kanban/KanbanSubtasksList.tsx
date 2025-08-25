import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useSubtaskStore } from "@/stores/useSubtasksStore";

export default function KanbanSubtasksList({ task_id }: { task_id: number }) {
  const toggleSubtask = useSubtaskStore((state) => state.toggleSubtask);
  const subtasks = useSubtaskStore((state) => state.subtasks).filter(
    (subtask) => subtask.task_id === task_id
  );

  return (
    <ul className="">
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
