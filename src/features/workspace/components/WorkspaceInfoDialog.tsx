import { Dialog, DialogContent } from "@/components/ui/dialog";
import { parseLocalDate } from "@/utils";
import { useParams } from "react-router";
import { useFetchWorkspaceMembersQuery } from "../hooks/queries/useFetchWorkspaceMembersQuery";
import { useFetchWorkspaceQuery } from "../hooks/queries/useFetchWorkspaceQuery";
import WorkspaceInfoLeft from "./WorkspaceInfoLeft";
import WorkspaceInfoTabs from "./WorkspaceInfoTabs";

const mockActivities = [
  {
    id: 1,
    text: "created a new task: 'Design Landing Page'",
    user: { name: "Alice Johnson", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    time: "2025-09-13T14:20:00Z",
  },
  {
    id: 2,
    text: "uploaded a file: 'requirements.pdf'",
    user: { name: "Bob Lee", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    time: "2025-09-13T13:10:00Z",
  },
  {
    id: 3,
    text: "commented on task: 'API Integration'",
    user: { name: "Charlie Kim", avatar: "https://randomuser.me/api/portraits/men/76.jpg" },
    time: "2025-09-13T12:45:00Z",
  },
  {
    id: 4,
    text: "marked task 'Wireframes' as done",
    user: { name: "Dana Cruz", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
    time: "2025-09-13T11:30:00Z",
  },
  {
    id: 5,
    text: "joined the workspace",
    user: { name: "Evan Smith", avatar: "https://randomuser.me/api/portraits/men/85.jpg" },
    time: "2025-09-13T10:05:00Z",
  },
];

type Props = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function WorkspaceInfoDialog({ open, onOpenChange }: Props) {
  const { workspace_id } = useParams();
  const workspaceId = Number(workspace_id);

  const { data: workspace } = useFetchWorkspaceQuery(workspaceId);
  const { data: members = [] } = useFetchWorkspaceMembersQuery(workspaceId);

  const progress = 60; // temp

  let daysLeft: string | number = "N/A";
  if (workspace?.due_date) {
    const due = parseLocalDate(workspace.due_date);
    const now = new Date();

    now.setHours(0, 0, 0, 0);
    const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    daysLeft = diff >= 0 ? diff : 0;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[1100px] w-full p-0 flex flex-col overflow-hidden max-h-[90vh]">
        {workspace ? (
          <div className="flex flex-col md:flex-row h-[80vh] overflow-hidden">
            <WorkspaceInfoLeft workspace={workspace} progress={progress} daysLeft={daysLeft} activities={mockActivities} />
            <WorkspaceInfoTabs members={members} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[80vh] w-full">
            <span className="text-muted-foreground">Loading workspace...</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
