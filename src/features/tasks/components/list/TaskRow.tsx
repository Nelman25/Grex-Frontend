import { Checkbox } from "@/components/ui/checkbox";
import UserAvatars from "@/components/UserAvatars";
import { capitalizeWord, formatDate, getPrioLevelStyle, getProgressPercentage, getStatusStyle } from "@/utils";
import React from "react";
import { RiDraggable } from "react-icons/ri";
import { usePatchSubtaskMutation } from "../../hooks/mutations/usePatchSubtaskMutation";
import { useFetchSubtasksQuery } from "../../hooks/queries/useFetchSubtasksQuery";
import { useFetchTaskAssigneesQuery } from "../../hooks/queries/useFetchTaskAssigneesQuery";
import type { Task } from "../../schemas/task.schema";
import type { Subtask } from "../../schemas/subtask.schema";

type Props = {
  task: Task;
  isSubtask?: boolean;
};

export default function TaskRow({ task, isSubtask }: Props) {
  const { data: subtasks = [], isPending } = useFetchSubtasksQuery(task.task_id);
  const { data: assignees = [] } = useFetchTaskAssigneesQuery(task.task_id);
  const { mutate: toggleSubtask } = usePatchSubtaskMutation(task.task_id);

  const assigneesData = assignees.map((a) => ({ name: a.name, avatar: a.avatar }));
  const hasSubtasks = subtasks.length > 0;
  const progress = getProgressPercentage(subtasks);

  const renderTaskRow = (taskData: Task, subtaskData?: Subtask, isSubtaskRow = false) => {
    return (
      <tr
        key={isSubtaskRow ? `subtask-${subtaskData?.subtask_id}` : `task-${taskData.task_id}`}
        className="border-b border-b-dark-muted"
      >
        <td className="max-w-60 px-3 py-3 border-r">
          <div className={`flex items-center gap-2 ${isSubtaskRow && "ml-5"}`}>
            {!isSubtaskRow && <RiDraggable className="cursor-grab" />}
            {isSubtaskRow && subtaskData && (
              <Checkbox
                className="rounded-sm"
                checked={subtaskData.is_done}
                onCheckedChange={() => toggleSubtask({ is_done: !subtaskData.is_done, subtask_id: subtaskData.subtask_id })}
              />
            )}
            <span className={`text-gray-200 text-base font-normal ${isSubtaskRow && subtaskData?.is_done && "line-through"}`}>
              {isSubtaskRow ? subtaskData?.description : taskData.title}
            </span>
          </div>
        </td>

        <td className="px-4 py-3 max-w-[300px] border-r">
          <span className="text-gray-400 text-sm">{isSubtaskRow ? "" : taskData.description || taskData.subject}</span>
        </td>

        <td className="px-4 py-3 max-w-[300px] border-r">
          <span className="text-gray-400 text-sm">{task.category}</span>
        </td>

        <td className="px-4 py-3 border-r">
          {!isSubtaskRow && (
            <div className="flex items-center -space-x-1">
              {assignees.length === 0 && <span className="text-sm text-dark-text">No assignees yet</span>}
              <UserAvatars users={assigneesData} />
            </div>
          )}
        </td>

        <td className="px-4 py-3 border-r">
          <span className="text-gray-300 text-sm">{isSubtaskRow ? "" : formatDate(taskData.deadline)}</span>
        </td>

        <td className="px-4 py-3 border-r">
          {!isSubtaskRow && (
            <span className={`px-2 py-1 rounded text-xs ${getStatusStyle(taskData.status)}`}>
              {capitalizeWord(taskData.status)}
            </span>
          )}
        </td>

        <td className="px-4 py-3 border-r">
          {!isSubtaskRow && (
            <span className={`px-2 py-1 rounded text-xs ${getPrioLevelStyle(taskData.priority_level)}`}>
              {capitalizeWord(taskData.priority_level)}
            </span>
          )}
        </td>

        <td className="px-4 py-3 border-r">
          {!isSubtaskRow && (
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-700 rounded-full h-2 min-w-[100px]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: "#11D835",
                  }}
                ></div>
              </div>
              <span className="text-gray-300 text-sm w-8 text-right">{progress}%</span>
            </div>
          )}
        </td>
      </tr>
    );
  };

  return (
    <React.Fragment>
      {renderTaskRow(task, undefined, isSubtask)}
      {hasSubtasks && subtasks.map((subtask) => renderTaskRow(task, subtask, true))}
      {!isSubtask && isPending && (
        <tr className="border-b border-gray-800">
          <td colSpan={6} className="px-4 py-3">
            <div className="ml-8 text-gray-400 text-sm">Loading subtasks...</div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}
