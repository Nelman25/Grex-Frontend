import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/UserAvatar";
import type { EditProject, WorkspaceResponse } from "@/types/project";
import { Edit, Link2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";
import { useEditWorkspaceMutation } from "../hooks/mutations/useEditWorkspaceMutation";
import WorkspaceInfoDisplay from "./WorkspaceInfoDisplay";
import WorkspaceInfoEdit from "./WorkspaceInfoEdit";
import { formatDateForAPI } from "@/utils";

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
  links: { id: number; label: string; url: string }[];
  newLink: { label: string; url: string };
  setNewLink: React.Dispatch<React.SetStateAction<{ label: string; url: string }>>;
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

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    console.log(`${Math.floor(diff / 86400)}d ago`);
    return `${Math.floor(diff / 86400)}d ago`;
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
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted transition text-sm font-medium"
              >
                <Link2 className="w-4 h-4 text-primary" />
                <span className="truncate">{link.label}</span>
                <span className="text-muted-foreground truncate">{link.url}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <Input
            placeholder="Label"
            value={newLink.label}
            onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
            className="w-1/3"
          />
          <Input
            placeholder="URL"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
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
