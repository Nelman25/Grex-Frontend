import KanbanColumn from "./KanbanColumn";
import { groupTasksByStatus } from "@/utils";
import { DragDropContext } from "@hello-pangea/dnd";
import { useMemo } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import type { TaskGroups } from "@/types/task";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import NewTaskModal from "../NewTaskModal";
import { useFetchTasksQuery } from "../../hooks/queries/useFetchTasksQuery";
import { toast } from "sonner";
import PageLoader from "@/components/PageLoader";

export default function KanbanContainer() {
  const { workspace_id } = useParams();
  const {
    data: tasks,
    isPending,
    error,
  } = useFetchTasksQuery(Number(workspace_id));

  if (error) toast(error.message);

  // THIS IS CLIENT STATE (derived), the positions of kanban items
  const positions = useMemo(() => groupTasksByStatus(tasks ?? []), [tasks]);

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
      <div className="my-2">
        <NewTaskModal>
          <Button className="text-sm bg-brand-primary hover:bg-brand-dark">
            <GoPlus />
            <span>Add New Task</span>
          </Button>
        </NewTaskModal>
      </div>
      <div className="w-full flex space-x-4">
        {isPending && (
          <div className="flex-1 flex justify-center items-center">
            <PageLoader />
          </div>
        )}

        {!isPending &&
          Object.entries(positions).map(([type, task]) => (
            <KanbanColumn key={type} type={type} tasks={task} />
          ))}
      </div>
    </DragDropContext>
  );
}
