import PageLoader from "@/components/PageLoader";
import { Progress } from "@/components/ui/progress";
import UserAvatars from "@/components/UserAvatars";
import type { Task } from "@/types/task";
import { capitalizeWord, formatDate, getPrioLevelStyle, getProgressPercentage } from "@/utils";
import type { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { BiCommentDetail } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { RiDraggable } from "react-icons/ri";
import { useFetchSubtasksQuery } from "../../hooks/queries/useFetchSubtasksQuery";
import { useFetchTaskAssigneesQuery } from "../../hooks/queries/useFetchTaskAssigneesQuery";
import SubtaskList from "../SubtaskList";
import TaskSheet from "../TaskSheet";
import { editTask } from "../../api/taskApi";
import { useParams } from "react-router";
import { toast } from "sonner";

type Props = {
  task: Task;
  isDragging: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
};

export default function KanbanTask({ task, isDragging, dragHandleProps }: Props) {
  const { workspace_id } = useParams();

  const { data: subtasks, isPending } = useFetchSubtasksQuery(task.task_id);
  const { data: assignees } = useFetchTaskAssigneesQuery(task.task_id);

  const assigneesInfo = assignees?.map((a) => ({
    avatar: a.avatar,
    name: a.name,
  }));

  const progressPercentage = getProgressPercentage(subtasks ?? []);

  if (progressPercentage === 100 && task.status !== "done") {
    editTask(Number(workspace_id), task.task_id, {
      marked_done_at: new Date(),
      status: "done",
    });

    toast.success("Task completed!");
  }

  return (
    <div
      className={`w-full p-2 bg-[#262626] my-2 rounded border border-dark-muted ${
        isDragging ? "shadow-lg scale-105 transform rotate-2 bg-[#3a3a3a]" : ""
      } transition-all duration-200`}
    >
      <div className="flex justify-between">
        <div className={`p-1 rounded-sm text-xs  ${getPrioLevelStyle(task.priority_level)}`}>
          {capitalizeWord(task.priority_level)}
        </div>

        <div {...(dragHandleProps || {})}>
          <RiDraggable className="size-6 text-dark-text" />
        </div>
      </div>

      <div>
        <TaskSheet task={task}>
          <h3 className="text-dark-text font-semibold hover:underline">{task.title}</h3>
        </TaskSheet>

        <p className="text-dark-subtle text-sm">{task.subject}</p>

        <div className="text-dark-subtle flex space-x-1 items-center text-xs my-2">
          <CiCalendar className="size-4" />
          <p>{formatDate(task.deadline)}</p>
        </div>

        <div className="p-2">
          <p className="text-sm text-white/70 line-clamp-3 text-wrap">
            {task.description}
          </p>
        </div>
      </div>

      <div className="my-2">
        {subtasks && <SubtaskList task_id={task.task_id} subtasks={subtasks} />}
        {isPending && <PageLoader />}
      </div>

      <div className="flex justify-between pt-2">
        {assigneesInfo && <UserAvatars users={assigneesInfo} />}
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
          <span className="text-dark-subtle">{progressPercentage}%</span>
        </div>

        <Progress value={progressPercentage} />
      </div>
    </div>
  );
}
