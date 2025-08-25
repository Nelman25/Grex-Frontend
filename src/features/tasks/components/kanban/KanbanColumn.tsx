import type { Task } from "@/types/task";
import { capitalizeWord, getTypeColor } from "@/utils";
import { VscKebabVertical } from "react-icons/vsc";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import KanbanTask from "./KanbanTask";

interface Props {
  type: string;
  tasks: Task[];
}

export default function KanbanColumn({ type, tasks }: Props) {
  // TODO: Better fallback for this

  return (
    <div className="w-full max-w-[600px] max-h-[900px] rounded bg p-4">
      <div className="flex justify-between sticky top-2">
        <div className="flex space-x-2 my-2">
          <div className={`h-8 w-1  ${getTypeColor(type)}`} />
          <span className="text-lg">{capitalizeWord(type)}</span>
          <div className="size-6  rounded-full text-center font-semibold">
            <span className="text-sm">{tasks.length}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button>
            <VscKebabVertical />
          </button>
        </div>
      </div>

      <Droppable droppableId={type}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`max-h-[700px] overflow-y-scroll ${
              snapshot.isDraggingOver
                ? "bg-[#2e2e2e] border-2 border-brand-primary"
                : ""
            } transition-all duration-200`}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.task_id}
                draggableId={String(task.task_id)}
                index={index}
              >
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <KanbanTask
                      task={task}
                      isDragging={snapshot.isDragging}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
