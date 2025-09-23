import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/UserAvatar";
import type { EditProject, QuickLink, WorkspaceResponse } from "@/types/project";
import { Edit, Link2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";
import { useEditWorkspaceMutation } from "../hooks/mutations/useEditWorkspaceMutation";
import WorkspaceInfoDisplay from "./WorkspaceInfoDisplay";
import WorkspaceInfoEdit from "./WorkspaceInfoEdit";
import { formatDateForAPI, timeAgo } from "@/utils";

type Props = {
  workspace: WorkspaceResponse;
  progress: number;
  daysLeft: string | number;
  activities: {
    id: number;
    text: string;
    user: {
      name: string;
      avatar: string;
    };
    time: string;
  }[];
  links: QuickLink[];
  newLink: QuickLink;
  setNewLink: React.Dispatch<React.SetStateAction<QuickLink>>;
  handleAddLink: () => void;
};

export default function WorkspaceInfoLeft({
  workspace,
  progress,
  daysLeft,
  activities,
  links,
  newLink,
  setNewLink,
  handleAddLink,
}: Props) {
  const [editing, setEditing] = useState(false);
  const { workspace_id } = useParams();
  const { mutate: editWorkspace } = useEditWorkspaceMutation(Number(workspace_id));

  const handleSave = (data: EditProject) => {
    editWorkspace(data);
    setEditing(false);
  };

  return (
    <div className="flex-1 min-w-0 space-y-6 no-scrollbar overflow-y-auto p-6 border-b md:border-b-0 md:border-r border-border">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-lg">Workspace Information</span>
        <Button size="sm" variant="ghost" onClick={() => setEditing((v) => !v)}>
          {editing ? "Cancel" : <Edit />}
        </Button>
      </div>
      {editing ? (
        <WorkspaceInfoEdit
          defaultValues={{
            name: workspace.name,
            description: workspace.description,
            project_nature: workspace.project_nature,
            start_date: workspace.start_date ? formatDateForAPI(workspace.start_date) : "",
            due_date: workspace.due_date ? formatDateForAPI(workspace.due_date) : "",
          }}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <WorkspaceInfoDisplay workspace={workspace} progress={progress} daysLeft={daysLeft} />
      )}

      {/* Recent Activities */}
      <div>
        <div className="font-semibold mb-2">Recent Activities</div>
        <ul className="space-y-3">
          {activities.map((a) => (
            <li key={a.id} className="flex items-center gap-3 p-2 rounded hover:bg-muted transition">
              {/* Avatar */}
              <UserAvatar name={a.user.name} photoUrl={a.user.avatar} />
              <div className="flex-1">
                <span className="font-medium">{a.user?.name ?? "Unknown"}</span>{" "}
                <span className="text-muted-foreground">{a.text}</span>
                <div className="text-xs text-muted-foreground">{a.time ? timeAgo(a.time) : ""}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Links */}
      <div>
        <div className="font-semibold mb-2">Quick Links</div>
        <ul className="space-y-2 mb-2">
          {links.map((link, index) => (
            <li key={`${link.link_name}-${link.link_url}-${index}`}>
              <a
                href={link.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted transition text-sm font-medium"
              >
                <Link2 className="w-4 h-4 text-primary" />
                <span className="truncate">{link.link_name}</span>
                <span className="text-muted-foreground truncate">{link.link_url}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <Input
            placeholder="Label"
            value={newLink.link_name}
            onChange={(e) => setNewLink({ ...newLink, link_name: e.target.value })}
            className="w-1/3"
          />
          <Input
            placeholder="URL"
            value={newLink.link_url}
            onChange={(e) => setNewLink({ ...newLink, link_url: e.target.value })}
            className="w-1/2"
          />
          <Button size="sm" onClick={handleAddLink}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
