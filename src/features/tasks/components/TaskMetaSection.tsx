import type { Task } from "@/types/task";
import TaskAssignees from "./TaskAssignees";
import TaskDueDate from "./TaskDueDate";
import TaskWorkspace from "./TaskWorkspace";
import type { Project } from "@/types/project";
import TaskFields from "./TaskFields";

type Props = {
  task: Task;
  project: Project | undefined; // temp
};

export default function TaskMetaSection({ task, project }: Props) {
  return (
    <div className="flex flex-col space-y-4 px-4">
      <TaskAssignees />
      <TaskDueDate task={task} />
      <TaskWorkspace project={project} />
      <TaskFields task={task} />
    </div>
  );
}
