import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileIcon, ImageIcon, UsersIcon } from "lucide-react";
import { useFetchWorkspaceQuery } from "@/features/workspace/hooks/queries/useFetchWorkspaceQuery";
import { useParams } from "react-router";
import { useAuth } from "@/context/auth-context";
import { formatDateToLong } from "@/utils";

// Mock data
const mockMembers = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://github.com/shadcn.png",
    status: "online",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://github.com/shadcn.png",
    status: "offline",
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: "https://github.com/shadcn.png",
    status: "online",
  },
];

const mockFiles = [
  {
    id: 1,
    name: "Project Brief.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedBy: "John Doe",
    date: "2024-03-15",
  },
  {
    id: 2,
    name: "Meeting Notes.docx",
    type: "doc",
    size: "1.1 MB",
    uploadedBy: "Jane Smith",
    date: "2024-03-14",
  },
];

const mockImages = [
  {
    id: 1,
    url: "https://picsum.photos/100",
    uploadedBy: "John Doe",
    date: "2024-03-15",
  },
  {
    id: 2,
    url: "https://picsum.photos/100",
    uploadedBy: "Jane Smith",
    date: "2024-03-14",
  },
];

const mockLinks = [
  {
    id: 1,
    title: "Project Roadmap",
    url: "https://example.com/roadmap",
    sharedBy: "John Doe",
    date: "2024-03-15",
  },
  {
    id: 2,
    title: "Design Assets",
    url: "https://example.com/assets",
    sharedBy: "Jane Smith",
    date: "2024-03-14",
  },
];

export default function ChatContainer() {
  const { user } = useAuth();
  const { workspace_id } = useParams();
  const { data: project } = useFetchWorkspaceQuery(Number(workspace_id), user?.user_id);
  const members = project?.members || [];

  return (
    <div className="shadow flex h-full w-full gap-4 overflow-hidden">
      {/* Chat area */}
      <div className="bg-dark-surface rounded-xl overflow-hidden flex flex-col flex-1 min-h-0 max-h-[800px]">
        <ChatHeader />
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <ChatMessageList />
        </div>
        <div className="border-t border-dark-muted px-4 py-2">
          <ChatInput />
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-[500px] flex flex-col rounded-xl border border-dark-muted bg-dark-surface/50 backdrop-blur-sm max-h-[800px]">
        <ScrollArea className="">
          {/* Static Info Section */}
          <div className="p-4 space-y-6">
            {/* Workspace Profile */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mb-2">
                {project?.workspace_profile_url ? (
                  <img
                    src={project.workspace_profile_url}
                    alt={project.name}
                    className="w-full h-full rounded-full object-cover border border-dark-muted"
                  />
                ) : (
                  <UsersIcon className="w-10 h-10 text-muted-foreground" />
                )}
              </div>
              <h3 className="font-semibold text-lg">{project?.name}</h3>
              <p className="text-sm text-muted-foreground text-justify line-clamp-6 mt-1">{project?.description}</p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium mb-2">Quick Actions</h4>
              <button className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors text-sm">
                <UsersIcon className="size-4" />
                Add Members
              </button>
              <button className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors text-sm">
                <FileIcon className="size-4" />
                Share Files
              </button>
            </div>

            {/* Project Details */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Project Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Nature</span>
                  <span>{project?.project_nature}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Start Date</span>
                  <span>{project?.start_date && formatDateToLong(project.start_date)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Due Date</span>
                  <span>{project?.due_date && formatDateToLong(project.due_date)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Members</span>
                  <span>{mockMembers.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="members" className="border-t border-dark-muted">
            <TabsList className="w-full justify-start rounded-none bg-muted/80 border-b border-dark-muted sticky top-0 z-10">
              <TabsTrigger value="members" className="flex py-4 rounded-none gap-2 data-[state=active]:bg-dark-muted">
                <UsersIcon className="size-4" />
                Members
              </TabsTrigger>
              <TabsTrigger value="files" className="flex py-4 rounded-none gap-2 data-[state=active]:bg-dark-muted">
                <FileIcon className="size-4" />
                Files
              </TabsTrigger>
              <TabsTrigger value="media" className="flex py-4 rounded-none gap-2 data-[state=active]:bg-dark-muted">
                <ImageIcon className="size-4" />
                Media
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <div className="overflow-y-auto">
              <TabsContent value="members" className="m-0 max-h-40">
                <div className="p-4 space-y-3">
                  {members.map((member) => (
                    <div
                      key={member.user_id}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                    >
                      <div className="relative">
                        <img src={member.profile_picture ?? undefined} className="size-8 rounded-full border border-dark-muted" />
                        <div
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-dark-surface ${
                            member.status === "online" ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{member.first_name + " " + member.last_name}</div>
                        <div className="text-xs text-muted-foreground capitalize">{member.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="files" className="m-0">
                <div className="p-4 space-y-2">
                  {mockFiles.map((file) => (
                    <div key={file.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                      <div className="p-2 bg-muted/30 rounded-md">
                        <FileIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-sm truncate">{file.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>{new Date(file.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="media" className="m-0">
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-2">
                    {mockImages.map((image) => (
                      <div
                        key={image.id}
                        className="aspect-square rounded-md overflow-hidden border border-dark-muted hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        <img src={image.url} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </ScrollArea>
      </div>
    </div>
  );
}
