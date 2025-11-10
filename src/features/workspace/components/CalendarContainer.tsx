import noEvents from "@/assets/noEvents.svg";
import ProjectCalendar from "@/components/calendar/ProjectCalendar";
import PageLoader from "@/components/PageLoader";
import { useFetchTasksQuery } from "@/features/tasks/hooks/queries/useFetchTasksQuery";
import { mapTasksToEvents } from "@/utils";
import { useParams } from "react-router";
import { toast } from "sonner";

export default function CalendarContainer() {
  const { workspace_id } = useParams();
  const { data: tasks, isPending, error } = useFetchTasksQuery(Number(workspace_id));

  if (error) toast(error.message);

  if (tasks?.length === 0) {
    return (
      <div className="min-w-[500px] w-full flex items-center justify-center h-[500px]">
        <div className="flex flex-col items-center">
          <img src={noEvents} alt="No tasks icons" className="size-56" />
          <h3 className="mt-2 text-lg font-medium text-dark-text">No tasks scheduled</h3>
          <p className="text-dark-subtle">Add tasks to see them appear on your calendar</p>
        </div>
      </div>
    );
  }

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
