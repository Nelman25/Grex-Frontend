import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-context";
import { useFetchUserTasksQuery } from "@/features/tasks/hooks/queries/useFetchUserTasksQuery";
import type { TaskStatus, UserTask } from "@/types/task";
import { formatDate, timeAgo } from "@/utils";
import { Calendar, CircleAlert } from "lucide-react";
import { useNavigate } from "react-router";
import slugify from "slugify";

export default function MyTasks() {
  const { user } = useAuth();
  const { data: tasks = [], isPending } = useFetchUserTasksQuery(user?.user_id);
  const navigate = useNavigate();

  const statusOrder: Record<TaskStatus, number> = {
    overdue: 0,
    pending: 1,
    done: 2,
  };

  const sortTasksByStatus = (tasks: UserTask[]): UserTask[] => {
    return [...tasks].sort((a, b) => {
      return statusOrder[a.status] - statusOrder[b.status];
    });
  };

  const getStatusStyle = (status: TaskStatus) => {
    if (status === "done") return "text-success";
    else if (status === "pending") return "text-blue-400";
    else if (status === "overdue") return "text-error";
  };

  const handleDirectToWorkspace = (workspace_name: string, workspace_id: number) => {
    navigate(`/my-projects/${workspace_id}/${slugify(workspace_name)}`);
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-[1200px] mx-auto pt-24">
        <h1 className="text-2xl font-bold">My Tasks</h1>

        <div className="mt-6 max-h-[750px] overflow-auto">
          {isPending &&
            Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="px-8 py-4 hover:bg-dark-muted/20 rounded">
                <Skeleton className="max-w-[200px] h-[30px] my-2 rounded-full " />
                <Skeleton className="max-w-[450px] h-[30px] my-2 rounded-full " />
                <div className="flex justify-between mt-3">
                  <Skeleton className="w-[150px] h-[20px] rounded-full " />
                  <Skeleton className="w-[150px] h-[20px] rounded-full " />
                </div>
              </div>
            ))}

          {sortTasksByStatus(tasks).map((task) => (
            <div
              key={task.task_id}
              role="button"
              className="px-8 py-4 hover:bg-dark-muted/20 rounded"
              onClick={() => handleDirectToWorkspace(task.workspace_name, task.workspace_id)}
            >
              <div className="flex flex-col pb-2 border-b">
                {task.status === "overdue" && (
                  <div className="text-error text-sm flex space-x-2 items-center font-bold">
                    <CircleAlert className="size-4 " />
                    <span>Due {timeAgo(task.deadline)}</span>
                  </div>
                )}
                <h3 className="text-dark-text text-lg font-medium">{task.title}</h3>
                <p className="text-dark-subtle line-clamp-1">{task.description}</p>

                <div className="flex justify-between items-center mt-4 text-sm">
                  <div className={`flex space-x-2  items-center ${getStatusStyle(task.status)} bg-transparent`}>
                    <Calendar className="size-4" />
                    <span>{formatDate(task.deadline)}</span>
                  </div>

                  <div>
                    <span className="text-brand-primary font-medium">
                      {task.workspace_name}/{task.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
