import PageLoader from "@/components/PageLoader";
import { useAuth } from "@/context/auth-context";
import { useFetchWorkspaceQuery } from "@/features/workspace/hooks/queries/useFetchWorkspaceQuery";
import { Label } from "@radix-ui/react-label";
import { useParams } from "react-router";
import { toast } from "sonner";

export default function TaskWorkspace() {
  const { user } = useAuth();
  const { workspace_id } = useParams();
  const {
    data: project,
    isPending,
    error,
  } = useFetchWorkspaceQuery(Number(workspace_id), user?.user_id);

  if (isPending) return <PageLoader />;
  if (error) toast(error.message);

  return (
    <div className="grid grid-cols-2 gap-4 items-center">
      <Label>Workspace</Label>
      <p>{project?.name}</p>
    </div>
  );
}
