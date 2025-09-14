import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkspaceMembersList from "./WorkspaceMembersList";
import type { WorkspaceMember } from "@/types/member";

export default function WorkspaceInfoTabs({ members }: { members: WorkspaceMember[] }) {
  return (
    <div className="flex-1 min-w-0 overflow-y-auto p-6">
      <Tabs defaultValue="members">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>
        <TabsContent value="members">
          <WorkspaceMembersList members={members} />
        </TabsContent>
        <TabsContent value="images">
          <div className="text-sm text-muted-foreground">No images yet.</div>
        </TabsContent>
        <TabsContent value="files">
          <div className="text-sm text-muted-foreground">No files yet.</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
