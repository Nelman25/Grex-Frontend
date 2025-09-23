import UserTaskPieChart from "@/components/dashboard/UserTaskPieChart";
import WeeklyProgressChart from "@/components/dashboard/WeeklyProgressChart";
import WorkspaceTasksDistribution from "@/components/dashboard/WorkspaceTasksDistribution";
import NoProject from "@/components/NoProject";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth-context";
import { useFetchUserTasksQuery } from "@/features/tasks/hooks/queries/useFetchUserTasksQuery";
import ChartCard from "@/features/workspace/components/ChartCard";
import { useFetchAllWorkspacesQuery } from "@/features/workspace/hooks/queries/useFetchAllWorkspacesQuery";
import { getTaskSummary } from "@/utils";
import { AlertTriangle, CheckCircle, ClipboardClock, ClipboardList, ClipboardX, Clock, ListChecks } from "lucide-react";

type DashboardMessage = {
  title: string;
  description: string;
};

export default function Dashboard() {
  const { user } = useAuth();
  const { data: workspaces = [] } = useFetchAllWorkspacesQuery(user?.user_id);
  const { data: tasks = [] } = useFetchUserTasksQuery(user?.user_id);
  const [done, pending, overdue] = getTaskSummary(tasks);

  const getDashboardMessage = (name: string | undefined): DashboardMessage => {
    const messages: DashboardMessage[] = [
      { title: `Welcome back, ${name} 👋`, description: "Here's what's happening with your tasks today." },
      { title: `Good to see you again, ${name} 👋`, description: "Let’s check what’s on your plate today." },
      { title: `Hey ${name} 👋`, description: "Ready to tackle today’s tasks?" },
      { title: `Hi ${name} 👋`, description: "Here’s a quick look at your tasks for today." },
      { title: `${name}, welcome back 👋`, description: "Let’s get some progress in your tasks today." },
      { title: `Let’s crush it today, ${name} 🚀`, description: "Your goals are waiting — let’s get started!" },
      { title: `Morning, ${name}! ☀️`, description: "A fresh start for your tasks today." },
      { title: `Back at it, ${name} 💪`, description: "Here’s what’s lined up for you today." },
      { title: `Stay focused, ${name} 🎯`, description: "One step closer to finishing your goals." },
      { title: `Welcome, ${name} 🌟`, description: "Let’s make today productive and meaningful." },
      { title: `You’ve got this, ${name} 🙌`, description: "Here’s your roadmap for today’s tasks." },
      { title: `Ready when you are, ${name} 🔥`, description: "Your tasks are queued up and waiting." },
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  const { title, description } = getDashboardMessage(user?.first_name);

  return (
    <div className="w-full h-full p-12 font-inter">
      {workspaces?.length === 0 && <NoProject />}

      {workspaces && (
        <>
          <h1 className="text-2xl text-dark-text font-bold">{title}</h1>
          <p className="text-dark-subtle font-medium">{description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-6">
            <div className="p-4 w-full rounded border bg-dark-surface">
              <div className="size-12 text-dark-bg rounded border bg-info flex items-center justify-center">
                <ClipboardList strokeWidth={1} />
              </div>

              <div className="flex flex-col mt-4">
                <span className="text-xl font-bold text-dark-text">{tasks.length}</span>
                <span className="text-sm font-medium text-dark-subtle">Total Tasks</span>
                <Progress className="mt-2" value={(tasks.length / tasks.length) * 100} />
              </div>
            </div>

            <div className="p-4 w-full rounded border bg-dark-surface">
              <div className="size-12 text-dark-bg rounded border bg-warning flex items-center justify-center">
                <ClipboardClock strokeWidth={1} />
              </div>
              <div className="flex flex-col mt-4">
                <span className="text-xl font-bold text-dark-text">{pending}</span>
                <span className="text-sm font-medium text-dark-subtle">In Progress Tasks</span>
                <Progress className="mt-2" value={(pending / tasks.length) * 100} />
              </div>
            </div>

            <div className="p-4 w-full rounded border bg-dark-surface">
              <div className="size-12 text-dark-bg rounded border bg-error flex items-center justify-center">
                <ClipboardX strokeWidth={1} />
              </div>
              <div className="flex flex-col mt-4">
                <span className="text-xl font-bold text-dark-text">{overdue}</span>
                <span className="text-sm font-medium text-dark-subtle">Overdue Tasks</span>
                <Progress className="mt-2" value={(overdue / tasks.length) * 100} />
              </div>
            </div>

            <div className="p-4 w-full rounded border bg-dark-surface">
              <div className="size-12 text-dark-bg rounded border bg-success flex items-center justify-center">
                <ListChecks strokeWidth={1} />
              </div>
              <div className="flex flex-col mt-4">
                <span className="text-xl font-bold text-dark-text">{done}</span>
                <span className="text-sm font-medium text-dark-subtle">Completed Tasks</span>
                <Progress className="mt-2" value={(done / tasks.length) * 100} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-4">
            <ChartCard title="Task Status Breakdown" subtitle="Overview of all your tasks by status">
              <UserTaskPieChart tasks={tasks} />
            </ChartCard>
            <ChartCard title="Tasks by Workspace" subtitle="Distribution of tasks across your workspaces">
              <WorkspaceTasksDistribution tasks={tasks} />
            </ChartCard>
            <ChartCard title="Weekly Progress" subtitle="Tasks completed each day this week">
              <WeeklyProgressChart />
            </ChartCard>
          </div>

          <div className="flex flex-wrap gap-6 mt-8">
            <div className="bg-dark-surface rounded shadow-sm border border-dark-muted p-6 flex-1 min-w-[300px]">
              <h4 className="font-semibold text-dark-text mb-3">Recent Activity</h4>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                  <span className="text-dark-subtle">Completed "Review project proposal"</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 text-blue-500 mr-3" />
                  <span className="text-dark-subtle">Started "Design wireframes"</span>
                </div>
                <div className="flex items-center text-sm">
                  <AlertTriangle className="w-4 h-4 text-red-500 mr-3" />
                  <span className="text-dark-subtle">Overdue: "Submit final report"</span>
                </div>
              </div>
            </div>

            <div className="bg-dark-surface rounded shadow-sm border border-dark-muted p-6 flex-1 min-w-[300px]">
              <h4 className="font-semibold text-dark-text mb-3">Productivity Tips</h4>
              <ul className="text-sm px-4 text-dark-subtle space-y-2 list-disc">
                <li>Focus on completing overdue tasks first</li>
                <li>Break large tasks into smaller chunks</li>
                <li>Set specific time blocks for deep work</li>
              </ul>
            </div>

            <div className="bg-dark-surface rounded shadow-sm border border-dark-muted p-6 flex-1 min-w-[300px]">
              <h4 className="font-semibold text-dark-text mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-brand-primary text-light-text rounded-lg hover:bg-brand-dark transition-colors text-sm">
                  Create New Workspace
                </button>
                <button className="w-full px-4 py-2 bg-gray-300 text-light-text rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  View All Tasks
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
