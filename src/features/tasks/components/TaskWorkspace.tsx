import PageLoader from "@/components/PageLoader";
import { useFetchWorkspaceQuery } from "@/features/workspace/hooks/queries/useFetchWorkspaceQuery";
import { Label } from "@radix-ui/react-label";
import { useParams } from "react-router";
import { toast } from "sonner";

export default function TaskWorkspace() {
  const { workspace_id } = useParams();
  const { data: project, isPending, error } = useFetchWorkspaceQuery(Number(workspace_id));

  if (isPending) return <PageLoader />;
  if (error) toast(error.message);

  return (
    <div className="max-w-[400px] grid grid-cols-2 gap-4">
      <Label>Workspace</Label>
      <p className="line-clamp-2">{project?.name}</p>
    </div>
  );
}
