import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { WorkspaceResponse } from "@/types/project";
import { Image as ImageIcon } from "lucide-react";

export default function WorkspaceInfoDisplay({
  workspace,
  progress,
  daysLeft,
}: {
  workspace: WorkspaceResponse;
  progress: number;
  daysLeft: string | number;
}) {
  return (
    <>
      <div className="flex items-center gap-3 mb-2">
        {workspace.workspace_profile_url ? (
          <img
            src={workspace.workspace_profile_url}
            alt="Workspace Profile"
            className="w-12 h-12 rounded-full object-cover border"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center border">
            <ImageIcon className="w-6 h-6 text-muted-foreground" />
          </div>
        )}
        <DialogTitle>{workspace?.name ?? "Workspace Name"}</DialogTitle>
      </div>
      <DialogDescription className="mb-2">
        {workspace?.description ?? "Workspace description goes here."}
      </DialogDescription>
      <div>
        <div className="text-sm text-muted-foreground">Project Nature</div>
        <div>{workspace?.project_nature ?? "N/A"}</div>
      </div>
      <div className="flex gap-4 flex-wrap">
        <div>
          <div className="text-sm text-muted-foreground">Start Date</div>
          <div>{workspace?.start_date ? new Date(workspace.start_date).toLocaleDateString() : "N/A"}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">End Date</div>
          <div>{workspace?.due_date ? new Date(workspace.due_date).toLocaleDateString() : "N/A"}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Days Left</div>
          <div>{daysLeft !== "N/A" ? `${daysLeft} day${daysLeft === 1 ? "" : "s"}` : "N/A"}</div>
        </div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground mb-1">Progress</div>
        <div className="w-full bg-gray-200 rounded h-2">
          <div className="bg-primary h-2 rounded" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-xs mt-1">{progress}% complete</div>
      </div>
    </>
  );
}
