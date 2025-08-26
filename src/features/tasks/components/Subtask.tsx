import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useSubtaskStore } from "@/stores/useSubtasksStore";
import type { Subtask } from "@/types/task";

type Props = {
  subtask: Subtask;
};

export default function SubtaskItem({ subtask }: Props) {
  // THIS WILL BE A FUNCTION THAT TRIGGERS A PATCH REQUEST FOR TOGGLING is_done FIELD IN THE SERVER
  const toggleSubtask = useSubtaskStore((state) => state.toggleSubtask);

  return (
    <li key={subtask.subtask_id} className="flex items-center gap-2 px-4">
      <Checkbox
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
  );
}
