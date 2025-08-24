import type { Task } from "@/types/task";
import { capitalizeWord, formatDate, getPrioLevelStyle } from "@/utils";
import { CiCalendar } from "react-icons/ci";
import { RiDraggable } from "react-icons/ri";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { BiCommentDetail } from "react-icons/bi";
import WorkspaceMembers from "@/features/workspace/components/WorkspaceMembers";
import { Progress } from "@/components/ui/progress";

type Props = {
  task: Task;
};

export default function KanbanTask({ task }: Props) {
  return (
    <div className="w-full p-4 bg-[#262626] my-2 rounded border border-dark-muted">
      <div className="flex justify-between">
        <div
          className={`px-4 py-1 rounded-sm text-sm  ${getPrioLevelStyle(
            task.priority_level
          )}`}
        >
          {capitalizeWord(task.priority_level)}
        </div>
        <RiDraggable className="size-6 text-dark-text" />
      </div>

      <div>
        <h3 className="text-dark-text">{task.title}</h3>
        <p className="text-dark-subtle text-sm">{task.subject}</p>
        <div className="text-dark-subtle flex space-x-2 items-center text-sm my-2">
          <CiCalendar />
          <p>{formatDate(task.deadline)}</p>
        </div>
        <div className="p-2">
          <p className="text-sm text-dark-subtle">{task.description}</p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        {/* This is temporary */}
        <WorkspaceMembers />
        <div className="flex space-x-2">
          <div className="bg-dark-muted text-dark-text p-2 rounded flex items-center space-x-1">
            <IoDocumentAttachOutline className="size-4" />
            <span className="text-sm">3</span>
          </div>
          <div className="bg-dark-muted text-dark-text p-2 rounded flex items-center space-x-1">
            <BiCommentDetail className="size-4" />
            <span className="text-sm">3</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between my-1">
          <span className="text-dark-text">Progress</span>
          <span className="text-dark-subtle">83%</span>
        </div>
        <Progress value={83} />
      </div>
    </div>
  );
}
