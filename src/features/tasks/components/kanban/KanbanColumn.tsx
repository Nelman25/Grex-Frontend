import { capitalizeWord } from "@/utils";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import CategoryDropdown from "../CategoryDropdown";
import KanbanTask from "./KanbanTask";
import NewCategoryInput from "./NewCategoryInput";
import type { Task } from "../../schemas/task.schema";

interface Props {
  type: string;
  tasks: Task[];
  isLeader: boolean;
}

export default function KanbanColumn({ type, tasks, isLeader }: Props) {
  const [isEditingCategory, setIsEditingCategory] = useState(false);

  return (
    <div className="w-full min-w-[350px] max-w-[350px] mt-4 h-auto max-h-[750px] rounded">
      <div className="flex justify-between items-center sticky top-2">
        {!isEditingCategory && (
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-lg font-semibold">{capitalizeWord(type)}</span>
            <div className="size-6  rounded-full text-center font-semibold">
              <span className="text-sm text-dark-subtle">{tasks.length}</span>
            </div>
          </div>
        )}

        <div>
          {isEditingCategory ? (
            <NewCategoryInput category={type} onCancel={() => setIsEditingCategory(false)} />
          ) : (
            <CategoryDropdown onEdit={() => setIsEditingCategory(true)} category={type} isLeader={isLeader}>
              <GoKebabHorizontal />
            </CategoryDropdown>
          )}
        </div>
      </div>

      <Droppable droppableId={type}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[10px] max-h-[650px] overflow-y-auto no-scrollbar ${
              snapshot.isDraggingOver ? "bg-transparent border-2 border-brand-primary" : ""
            } transition-all duration-200`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.task_id} draggableId={String(task.task_id)} index={index}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <KanbanTask task={task} isDragging={snapshot.isDragging} dragHandleProps={provided.dragHandleProps} />
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
