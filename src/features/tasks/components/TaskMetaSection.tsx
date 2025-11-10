import type { Task } from "../schemas/task.schema";
import TaskAssignees from "./TaskAssignees";
import TaskDueDate from "./TaskDueDate";
import TaskFields from "./TaskFields";
import TaskWorkspace from "./TaskWorkspace";

type Props = {
  task: Task;
};

export default function TaskMetaSection({ task }: Props) {
  return (
    <div className="flex flex-col space-y-2">
      <TaskAssignees id={task.task_id} canManageAssignees={true} />
      <TaskDueDate task={task} />
      <TaskWorkspace />
      <TaskFields task={task} />
    </div>
  );
}
