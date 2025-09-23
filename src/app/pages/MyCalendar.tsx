import ProjectCalendar from "@/components/calendar/ProjectCalendar";
import { useAuth } from "@/context/auth-context";
import { useFetchUserTasksQuery } from "@/features/tasks/hooks/queries/useFetchUserTasksQuery";
import type { CalendarEvent } from "@/types";
import type { UserTask } from "@/types/task";

export default function MyCalendar() {
  const { user } = useAuth();
  const { data: tasks = [] } = useFetchUserTasksQuery(user?.user_id);

  const mapUserTasksToEvents = (tasks: UserTask[]): CalendarEvent[] => {
    return tasks.map((task) => {
      const start = new Date(task.start_date).toISOString().split("T")[0];
      const end = new Date(task.deadline).toISOString().split("T")[0];

      return {
        id: task.task_id,
        title: task.title + " | " + task.workspace_name,
        start,
        end,
        description: task.description,
      };
    });
  };

  return (
    <div className="w-full p-8">
      <h1 className="text-xl text-dark-text font-bold">My Calendar</h1>
      <p className="text-lg text-dark-subtle">Stay on top of your schedule with every task from all your workspaces in one place</p>
      <ProjectCalendar events={mapUserTasksToEvents(tasks)} mode="user" />
    </div>
  );
}
