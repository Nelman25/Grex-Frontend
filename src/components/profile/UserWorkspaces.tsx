import { Card, CardContent } from "../ui/card";
import { useAuth } from "@/features/auth/hooks/auth-context";
import { useFetchAllWorkspacesQuery } from "@/features/workspace/hooks/queries/useFetchAllWorkspacesQuery";
import { Badge } from "../ui/badge";

export default function UserWorkspaces() {
  const { user } = useAuth();
  const { data: workspaces = [] } = useFetchAllWorkspacesQuery(user?.user_id);

  const getUserRole = (created_by: number): string => {
    if (created_by === user?.user_id) return "Leader";
    else return "Member";
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">My Workspaces</h3>
      <Card className="bg-dark-surface border-dark-muted rounded">
        <CardContent className=" grid gap-4">
          {workspaces.map((workspace) => (
            <div
              key={workspace.workspace_id}
              className="flex items-center gap-4 p-4 rounded-lg border border-dark-muted hover:bg-muted/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-muted/30 flex items-center justify-center">
                {workspace.workspace_profile_url ? (
                  <img
                    src={workspace.workspace_profile_url}
                    alt={workspace.name}
                    className="w-full h-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="text-xl font-semibold text-muted-foreground">{workspace.name.charAt(0)}</div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{workspace.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{getUserRole(workspace.created_by)}</Badge>
                  <span className="text-xs text-muted-foreground">{workspace.project_nature}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
