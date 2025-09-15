import { useAuth } from "@/context/auth-context";
import { useFetchWorkspaceQuery } from "@/features/workspace/hooks/queries/useFetchWorkspaceQuery";
import { getInitials } from "@/utils";
import { useParams } from "react-router";

export default function ChatHeader() {
  const { user } = useAuth();
  const { workspace_id } = useParams();
  const { data: project } = useFetchWorkspaceQuery(Number(workspace_id), user?.user_id);

  return (
    <div className="h-12 bg-muted/80 backdrop-blur-md border-b border-white/20 shadow-sm flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        {project?.workspace_profile_url ? (
          <img
            src={project.workspace_profile_url}
            alt={project.name}
            className="size-10 rounded-full border border-brand-light object-cover"
          />
        ) : (
          <div className="size-7 font-medium rounded-full bg-brand-primary border border-brand-light flex items-center justify-center text-light-text">
            {getInitials(project?.name)}
          </div>
        )}
        <span className="text-dark-text font-semibold">{project?.name}</span>
      </div>
    </div>
  );
}
