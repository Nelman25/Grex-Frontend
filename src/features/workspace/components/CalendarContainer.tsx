import ProjectCalendar from "@/components/calendar/ProjectCalendar";
import PageLoader from "@/components/PageLoader";
import { useFetchTasksQuery } from "@/features/tasks/hooks/queries/useFetchTasksQuery";
import { mapTasksToEvents } from "@/utils";
import { useParams } from "react-router";
import { toast } from "sonner";

export default function CalendarContainer() {
  const { workspace_id } = useParams();
  const {
    data: tasks,
    isPending,
    error,
  } = useFetchTasksQuery(Number(workspace_id));

  if (error) toast(error.message);

  return (
    <div>
      {isPending && (
        <div className="flex justify-center items-center h-80">
          <PageLoader />
        </div>
      )}

      {tasks && <ProjectCalendar events={mapTasksToEvents(tasks)} />}
    </div>
  );
}
