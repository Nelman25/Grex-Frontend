import { useAuth } from "@/features/auth/hooks/auth-context";
import { useFetchUserTasksQuery } from "@/features/tasks/hooks/queries/useFetchUserTasksQuery";
import { getTaskSummary } from "@/utils";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function UserTasksStats() {
  const { user } = useAuth();
  const { data: tasks = [] } = useFetchUserTasksQuery(user?.user_id);
  const [done, pending, overdue] = getTaskSummary(tasks);

  return (
    <Card className="bg-dark-surface border-dark-muted rounded">
      <CardHeader className="pb-3">
        <h3 className="text-lg font-medium">Task Statistics</h3>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-4xl font-bold text-green-500">{done}</p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </div>
        <div className="space-y-1">
          <p className="text-4xl font-bold text-yellow-500">{pending}</p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </div>
        <div className="space-y-1">
          <p className="text-4xl font-bold text-red-500">{overdue}</p>
          <p className="text-sm text-muted-foreground">Overdue</p>
        </div>
        <div className="space-y-1">
          <p className="text-4xl font-bold">{tasks.length}</p>
          <p className="text-sm text-muted-foreground">Total</p>
        </div>
      </CardContent>
    </Card>
  );
}
