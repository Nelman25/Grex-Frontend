import type { Task } from "@/types/task";
import TaskAssignees from "./TaskAssignees";
import TaskDueDate from "./TaskDueDate";
import TaskWorkspace from "./TaskWorkspace";
import TaskFields from "./TaskFields";

type Props = {
  task: Task;
};

export default function TaskMetaSection({ task }: Props) {
  return (
    <div className="flex flex-col space-y-4 px-4">
      <TaskAssignees id={task.task_id} />
      <TaskDueDate task={task} />
      <TaskWorkspace />
      <TaskFields task={task} />
    </div>
  );
}
