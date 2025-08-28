import type { Project } from "@/types/project";
import { Label } from "@radix-ui/react-label";

// THIS PROP IS TEMPORARY, THE WORKSPACE/PROJECT WILL BE FETCHED FROM THIS COMPONENT
export default function TaskWorkspace({
  project,
}: {
  project: Project | undefined;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 items-center">
      <Label>Workspace</Label>
      <p>{project?.name}</p>
    </div>
  );
}
