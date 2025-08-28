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
import { Progress } from "@/components/ui/progress";
import type { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { useSubtaskStore } from "@/stores/useSubtasksStore";
import TaskSheet from "../TaskSheet";
import SubtaskList from "../SubtaskList";
import UserAvatars from "@/components/UserAvatars";
import { useAssigneeStore } from "@/stores/useAssigneesStore";

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
  // TODO: Data fetching for subtasks and assignees
  // endpoints:
  // get subtasks -> /task/${task_id}/subtask
  // get assignees -> /task/${task_id}/assignment

  // CHANGE THIS TO THE ACTUAL DATA FETCHING FOR SUBTASKS
  const subtasks = useSubtaskStore((state) => state.subtasks).filter(
    (subtask) => subtask.task_id === task.task_id
  );
  // CHANGE THIS TO THE ACTUAL DATA FETCHING FOR TASK ASSIGNEES
  const assignees = useAssigneeStore((state) => state.assignees).filter(
    (i) => i.task_id === task.task_id
  );
  const assigneesAvatars = assignees.map((a) => a.avatar);

  return (
    <div
      className={`w-full p-2 bg-[#262626] my-2 rounded border border-dark-muted ${
        isDragging ? "shadow-lg scale-105 transform rotate-2 bg-[#3a3a3a]" : ""
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
        <TaskSheet task={task}>
          <h3 className="text-dark-text text-sm font-semibold hover:underline">
            {task.title}
          </h3>
        </TaskSheet>
        <p className="text-dark-subtle text-xs">{task.subject}</p>
        <div className="text-dark-subtle flex space-x-1 items-center text-xs my-2">
          <CiCalendar className="size-4" />
          <p>{formatDate(task.deadline)}</p>
        </div>
        <div className="p-2">
          <p className="text-xs text-dark-subtle">{task.description}</p>
        </div>
      </div>

      <div className="my-2">
        <SubtaskList subtasks={subtasks} />
      </div>

      <div className="flex justify-between pt-2">
        <UserAvatars images={assigneesAvatars} />
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
        <div className="flex justify-between my-1 text-sm">
          <span className="text-dark-text">Progress</span>
          <span className="text-dark-subtle">
            {getProgressPercentage(subtasks)}%
          </span>
        </div>

        <Progress value={getProgressPercentage(subtasks)} />
      </div>
    </div>
  );
}
