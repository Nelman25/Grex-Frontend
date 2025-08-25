import { useTaskStore } from "@/stores/useTasksStore";
import KanbanColumn from "./KanbanColumn";
import { groupTasksByStatus } from "@/utils";
import { DragDropContext } from "@hello-pangea/dnd";
import { useMemo } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import type { TaskGroups } from "@/types/task";
import { useParams } from "react-router";

export default function KanbanContainer() {
  // TODO: Actual data fetching for tasks of the selected project
  const { workspace_id } = useParams();

  // THIS WILL BE SERVER STATE
  // gets the tasks that belongs to the selected project. When the api endpoint is ready, this will be data fetching function
  const tasks = useTaskStore((state) => state.tasks).filter(
    (t) => t.workspace_id === Number(workspace_id)
  );

  // THIS IS CLIENT STATE (derived), the positions of kanban items
  const positions = useMemo(() => groupTasksByStatus(tasks), [tasks]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // if no destination (e.g., dropped outside the column), do nothing
    if (!destination) return;

    // if dropped in the same position, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // prevent dragging between columns
    if (source.droppableId !== destination.droppableId) return;

    // create a new copy of the task groups
    const newPositions = { ...positions };

    // get the source column (same as destination due to the check above)
    const column = newPositions[source.droppableId as keyof TaskGroups];

    // remove task from source and insert at the destination
    const [movedTask] = column.splice(source.index, 1);
    column.splice(destination.index, 0, movedTask);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="w-full flex space-x-4">
        {Object.entries(positions).map(([type, task]) => (
          <KanbanColumn key={type} type={type} tasks={task} />
        ))}
      </div>
    </DragDropContext>
  );
}
