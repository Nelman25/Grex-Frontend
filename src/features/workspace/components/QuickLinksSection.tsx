import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { NewQuickLink } from "@/types/project";
import { Link2, Trash } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useCreateQuickLinkMutation } from "../hooks/mutations/useCreateQuickLinkMutation";
import { useDeleteQuickLinkMutation } from "../hooks/mutations/useDeleteQuickLinkMutation";
import { useFetchQuickLinksQuery } from "../hooks/queries/useFetchQuickLinksQuery";

export default function QuickLinksSection() {
  const [newLink, setNewLink] = useState<NewQuickLink>({ link_name: "", link_url: "" });

  const { workspace_id } = useParams();
  const workspaceId = Number(workspace_id);

  const { data: links = [] } = useFetchQuickLinksQuery(workspaceId);
  const { mutate: createLink } = useCreateQuickLinkMutation(workspaceId);
  const { mutate: deleteLink } = useDeleteQuickLinkMutation(workspaceId);

  const handleAddLink = (link: NewQuickLink) => {
    createLink(link);
    setNewLink({ link_name: "", link_url: "" });
    toast.success("Added 1 quick link");
  };

  const handleDeleteLink = (id: number) => {
    deleteLink(id);
    toast.success("Deleted 1 quick link");
  };

  return (
    <div>
      <div className="font-semibold mb-2">Quick Links</div>
      <ul className="space-y-2 mb-2">
        {links.map((link) => (
          <li key={link.link_id} className="w-full flex items-center justify-between">
            <a
              href={link.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 px-3 py-2 rounded hover:bg-muted transition text-sm font-medium"
            >
              <Link2 className="size-4 text-primary" />
              <span className="truncate max-w-[20ch]">{link.link_name}</span>
              <span className="text-muted-foreground truncate max-w-[30ch]">{link.link_url}</span>
            </a>
            <button onClick={() => handleDeleteLink(link.link_id)}>
              <Trash className="text-error size-4" />
            </button>
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
        <Button size="sm" onClick={() => handleAddLink(newLink)}>
          Add
        </Button>
      </div>
    </div>
  );
}
