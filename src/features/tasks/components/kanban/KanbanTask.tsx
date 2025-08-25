import type { Task } from "@/types/task";
import {
  capitalizeWord,
  formatDate,
  getPrioLevelStyle,
  getProgressPercentage,
} from "@/utils";
import { CiCalendar } from "react-icons/ci";
import { RiDraggable } from "react-icons/ri";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { BiCommentDetail } from "react-icons/bi";
import WorkspaceMembers from "@/features/workspace/components/WorkspaceMembers";
import { Progress } from "@/components/ui/progress";
import type { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import KanbanSubtasksList from "./KanbanSubtasksList";
import { useSubtaskStore } from "@/stores/useSubtasksStore";

type Props = {
  task: Task;
  isDragging: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
};

export default function KanbanTask({
  task,
  isDragging,
  dragHandleProps,
}: Props) {
  const subtasks = useSubtaskStore((state) => state.subtasks).filter(
    (subtask) => subtask.task_id === task.task_id
  );

  return (
    <div
      className={`w-full p-2 bg-[#262626] my-2 rounded border border-dark-muted ${
        isDragging ? "shadow-lg scale-105 bg-[#3a3a3a]" : ""
      } transition-all duration-200`}
    >
      <div className="flex justify-between">
        <div
          className={`px-4 py-1 rounded-sm text-xs  ${getPrioLevelStyle(
            task.priority_level
          )}`}
        >
          {capitalizeWord(task.priority_level)}
        </div>
        <div {...(dragHandleProps || {})}>
          <RiDraggable className="size-6 text-dark-text" />
        </div>
      </div>

      <div>
        <h3 className="text-dark-text text-sm font-semibold">{task.title}</h3>
        <p className="text-dark-subtle text-xs">{task.subject}</p>
        <div className="text-dark-subtle flex space-x-2 items-center text-xs my-2">
          <CiCalendar />
          <p>{formatDate(task.deadline)}</p>
        </div>
        <div className="p-2">
          <p className="text-xs text-dark-subtle">{task.description}</p>
        </div>
      </div>

      <div className="my-2">
        <KanbanSubtasksList subtasks={subtasks} />
      </div>

      <div className="flex justify-between pt-2">
        {/* This is temporary */}
        <WorkspaceMembers />
        <div className="flex space-x-2">
          <div className="bg-dark-muted text-dark-text p-1 rounded flex items-center space-x-1">
            <IoDocumentAttachOutline className="size-3" />
            <span className="text-sm">3</span>
          </div>

          <div className="bg-dark-muted text-dark-text p-1 rounded flex items-center space-x-1">
            <BiCommentDetail className="size-3" />
            <span className="text-sm">3</span>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex justify-between my-1">
          <span className="text-dark-text text-sm">Progress</span>
          <span className="text-dark-subtle text-sm">
            {getProgressPercentage(subtasks)}%
          </span>
        </div>
        <Progress value={getProgressPercentage(subtasks)} />
      </div>
    </div>
  );
}
