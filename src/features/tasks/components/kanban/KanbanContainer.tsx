import { useAuth } from "@/features/auth/hooks/auth-context";
import { useFetchWorkspaceMembersQuery } from "@/features/workspace/hooks/queries/useFetchWorkspaceMembersQuery";
import type { TaskGroups } from "@/types/task";
import { groupTasksByCategory } from "@/utils";
import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext } from "@hello-pangea/dnd";
import { useMemo, useState } from "react";
import { GoPlus } from "react-icons/go";
import { RxSection } from "react-icons/rx";
import { useParams } from "react-router";
import { toast } from "sonner";
import { usePatchTaskMutation } from "../../hooks/mutations/usePatchTaskMutation";
import { useFetchCategoryQuery } from "../../hooks/queries/useFetchCategoriesQuery";
import { useFetchTasksQuery } from "../../hooks/queries/useFetchTasksQuery";
import NewTaskModal from "../NewTaskModal";
import KanbanColumn from "./KanbanColumn";
import NewCategoryInput from "./NewCategoryInput";

export default function KanbanContainer() {
  const { user } = useAuth();
  const { workspace_id } = useParams();

  const [activeNewCategory, setActiveNewCategory] = useState<string | null>(null);
  const [isAddNewCategory, setIsAddNewCategory] = useState(false);

  const { data: members = [] } = useFetchWorkspaceMembersQuery(Number(workspace_id));
  const { data: categories = [] } = useFetchCategoryQuery(Number(workspace_id));
  const { data: tasks = [] } = useFetchTasksQuery(Number(workspace_id));

  const isLeader = members.some((m) => m.user_id === user?.user_id && m.role === "leader");

  const { mutate: editTask } = usePatchTaskMutation(Number(workspace_id));

  const positions = useMemo(() => groupTasksByCategory(tasks ?? [], categories ?? []), [tasks, categories]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!isLeader) {
      toast.error("You don't have permission to move tasks");
      return;
    }

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const newPositions = { ...positions };
    const sourceColumn = newPositions[source.droppableId as keyof TaskGroups];
    const [movedTask] = sourceColumn.splice(source.index, 1);

    // If moving to a different category, update the task's category
    if (source.droppableId !== destination.droppableId) {
      const destinationColumn = newPositions[destination.droppableId as keyof TaskGroups];
      destinationColumn.splice(destination.index, 0, movedTask);

      editTask(
        {
          id: movedTask.task_id,
          payload: {
            title: movedTask.title,
            subject: movedTask.subject,
            description: movedTask.description,
            priority_level: movedTask.priority_level,
            start_date: movedTask.start_date,
            deadline: movedTask.deadline,
            category: destination.droppableId,
          },
        },
        {
          onSuccess: () => toast.success("Task moved to different category"),
          onError: () => toast.error("Failed to move task to different category"),
        }
      );
    } else {
      sourceColumn.splice(destination.index, 0, movedTask);
      toast("Order changed");
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="max-w-[1500px] overflow-x-auto no-scrollbar w-full flex space-x-4 h-full">
        {tasks &&
          Object.entries(positions).map(([type, task]) => (
            <div key={type} className="flex gap-2 ">
              <div>
                <KanbanColumn type={type} tasks={task} isLeader={isLeader} />
                <NewTaskModal category={type}>
                  <button className="ml-4 flex space-x-2 items-center">
                    <GoPlus className="text-brand-primary size-6" />
                    <span className="text-dark-text">Create Task</span>
                  </button>
                </NewTaskModal>
              </div>

              {activeNewCategory === type ? (
                <NewCategoryInput onCancel={() => setActiveNewCategory(null)} />
              ) : (
                <div onClick={() => setActiveNewCategory(type)} className="h-full w-[1px] bg-transparent relative group">
                  <div className="h-full w-[4px] flex justify-center">
                    <div className="w-[1px] hidden transition-all group-hover:flex bg-brand-primary/50 relative">
                      <button className="px-2 py-1 text-xs text-light-text rounded bg-brand-primary w-[90px] flex absolute top-1/2 -left-10">
                        Add Category
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

        {isAddNewCategory ? (
          <NewCategoryInput onCancel={() => setIsAddNewCategory(false)} />
        ) : (
          <button
            onClick={() => setIsAddNewCategory(true)}
            className="min-w-[160px] mt-6 text-dark-subtle bg-dark-muted/30 rounded py-1 flex space-x-2 self-start justify-center items-center "
          >
            <RxSection className="size-4 rotate-90" />
            <span>Add Category</span>
          </button>
        )}
      </div>
    </DragDropContext>
  );
}
