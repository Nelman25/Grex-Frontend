import { useTaskStore } from "@/stores/useTasksStore";
import KanbanColumn from "./KanbanColumn";
import { groupTasksByStatus } from "@/utils";

export default function KanbanContainer() {
  const { tasks } = useTaskStore();
  const { pending, done, overdue } = groupTasksByStatus(tasks);

  return (
    <div className="w-full grid grid-cols-3 gap-4">
      <KanbanColumn type="Pending" tasks={pending} />
      <KanbanColumn type="Done" tasks={done} />
      <KanbanColumn type="Overdue" tasks={overdue} />
    </div>
  );
}
