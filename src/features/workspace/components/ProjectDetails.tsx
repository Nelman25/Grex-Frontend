import { formatDate, getInitials } from "@/utils";
import type { Workspace } from "../schemas/workspace.schema";

type Props = {
  project: Workspace;
};

export default function ProjectDetails({ project }: Props) {
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
