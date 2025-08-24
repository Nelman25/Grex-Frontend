import { useProjectStore } from "@/stores/useProjectStore";
import { useParams } from "react-router";
import { formatDate, getInitials } from "@/utils";

export default function ProjectDetails() {
  const { projects } = useProjectStore();
  const { workspace_id } = useParams();
  const project = projects.find((p) => p.workspace_id === Number(workspace_id));

  // TODO: Replace this mocks with real data from the API endpoint.
  // fetch the selected project/workspace using the workspace_id from params
  // use suspense, do not show elements until important data are fetched.

  if (!project) return; // TODO: add fallback

  return (
    <div className="flex space-x-4">
      <div className="">
        <div className="flex items-center justify-center rounded-md size-12 bg-brand-primary">
          <span className="text-light-text text-xl font-bold">{getInitials(project.name)}</span>
        </div>
      </div>
      <div>
        <h3 className="font-medium ">{project.name}</h3>
        <div className="flex space-x-4 text">
          <p className="text-sm">
            <span className="text-dark-subtle">Timeline: </span>
            <span>
              {formatDate(project.start_date)} - {formatDate(project.due_date)}
            </span>
          </p>
          <p className="text-sm">
            <span className="text-dark-subtle">Status: </span>
            <span className="text-info font-medium">In Progress</span>
          </p>
        </div>
      </div>
    </div>
  );
}
