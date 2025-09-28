import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatImageViewer } from "@/features/workspace/components/ChatImageViewer";
import { useFetchWorkspaceMembersQuery } from "@/features/workspace/hooks/queries/useFetchWorkspaceMembersQuery";
import { useFetchWorkspaceQuery } from "@/features/workspace/hooks/queries/useFetchWorkspaceQuery";
import { useChatAttachmentStore } from "@/stores/useChatAttachmentStore";
import { useChatReplyStore } from "@/stores/useChatReplyStore";
import { formatDateToLong } from "@/utils";
import { CircleX, FileIcon, ImageIcon, UsersIcon } from "lucide-react";
import { BsPinAngle } from "react-icons/bs";
import { useParams } from "react-router";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";
import PinnedMessagesDialog from "./PinnedMessagesDialog";
import ReplyPreview from "./ReplyPreview";

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

export default function ChatContainer() {
  const { workspace_id } = useParams();
  const workspaceId = Number(workspace_id);
  const { data: project } = useFetchWorkspaceQuery(workspaceId);
  const { data: members = [] } = useFetchWorkspaceMembersQuery(workspaceId);

  const replyingTo = useChatReplyStore((state) => state.replyingTo);
  const attachment = useChatAttachmentStore((state) => state.attachment);
  const removeAttachment = useChatAttachmentStore((state) => state.removeAttachment);

  return (
    <div className="shadow flex h-full w-full gap-4 overflow-hidden">
      <div className="bg-dark-surface rounded-xl overflow-hidden flex flex-col flex-1 min-h-0 max-h-[800px]">
        <ChatHeader />
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <ChatMessageList />
        </div>
        <div className="border-t border-dark-muted px-4 py-2">
          {replyingTo && <ReplyPreview />}

          {attachment && (
            <>
              {attachment.file_type === "file" && (
                <div className="inline-flex items-center space-x-2 px-3 py-2 my-2 border rounded">
                  <div className="flex items-center justify-center rounded-full p-2 bg-blue-400">
                    <FileIcon strokeWidth={1} className="text-light-text size-4" />
                  </div>
                  <span className="text-sm">{attachment.file_name}</span>
                  <button>
                    <CircleX className="size-4" strokeWidth={1} onClick={removeAttachment} />
                  </button>
                </div>
              )}

              {attachment.file_type === "image" && (
                <div className="inline-flex relative mt-2">
                  <button onClick={removeAttachment} className="absolute -top-3 -right-3">
                    <CircleX strokeWidth={1} className="size-4" />
                  </button>
                  <img
                    src={attachment.file_url}
                    alt={attachment.file_name}
                    className="max-w-60 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm transition-transform"
                  />
                </div>
              )}
            </>
          )}
          <ChatInput />
        </div>
      </div>

      <div className="w-[500px] flex flex-col rounded-xl border border-dark-muted bg-dark-surface/50 backdrop-blur-sm max-h-[800px]">
        <ScrollArea className="">
          <div className="p-4 space-y-6">
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

            <div className="space-y-2">
              <h4 className="text-sm font-medium mb-2">Quick Actions</h4>
              <button className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors text-sm">
                <UsersIcon className="size-4" />
                Add Members
              </button>
              <PinnedMessagesDialog>
                <div
                  role="button"
                  className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors text-sm"
                >
                  <BsPinAngle className="size-4" />
                  View pinned messages
                </div>
              </PinnedMessagesDialog>
            </div>

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
                  <span>{members.length}</span>
                </div>
              </div>
            </div>
          </div>

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

            <div className="overflow-y-auto">
              <TabsContent value="members" className="m-0 max-h-40">
                <div className="p-4 space-y-3">
                  {members.map((member) => (
                    <div
                      key={member.user_id}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                    >
                      <img src={member.profile_picture ?? undefined} className="size-8 rounded-full border border-dark-muted" />
                      <div className="font-medium text-sm">{member.first_name + " " + member.last_name}</div>
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
                <ChatImageViewer />
              </TabsContent>
            </div>
          </Tabs>
        </ScrollArea>
      </div>
    </div>
  );
}
