import noMessages from "@/assets/noMessages.svg";
import PageLoader from "@/components/PageLoader";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UserAvatar from "@/components/UserAvatar";
import type { MessageHistoryItem } from "@/types/chat";
import { formatChatDate, formatFileSize, getFileExtension } from "@/utils";
import { isAttachmentMessageContent, isTextMessageContent } from "@/utils/typeGuards";
import { Download, FileText } from "lucide-react";
import type { PropsWithChildren } from "react";
import { LuDot } from "react-icons/lu";
import { RiUnpinFill } from "react-icons/ri";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useUnpinMessageMutation } from "../hooks/mutations/useUnpinMessageMutation";
import { useFetchPinnedMessagesQuery } from "../hooks/queries/useFetchPinnedMessagesQuery";

type Props = PropsWithChildren & {};

export default function PinnedMessagesDialog({ children }: Props) {
  const { workspace_id } = useParams();
  const workspaceId = Number(workspace_id);
  const { data: pinnedMessages = [], isPending } = useFetchPinnedMessagesQuery(workspaceId);
  const { mutate: unpinMessage } = useUnpinMessageMutation(workspaceId);

  const handleUnpinMessage = (message: MessageHistoryItem) => {
    unpinMessage(message.message_id);
    toast.success(`Message unpinned`);
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <div className="-mt-3">
          <h3 className="text-lg">Pinned Messages</h3>
        </div>

        <div className="max-h-[400px] overflow-y-auto no-scrollbar">
          {pinnedMessages &&
            pinnedMessages.map((message) => (
              <div key={message.message_id} className="mb-4">
                <div className="flex justify-between pl-11 text-sm text-dark-subtle">
                  <span>{message.nickname}</span>
                  <span>{formatChatDate(message.sent_at)}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex space-x-3 mt-2">
                    <UserAvatar name={message.nickname} photoUrl={message.avatar ?? undefined} />

                    {isTextMessageContent(message) && (
                      <div className="py-2 px-4 rounded bg-dark-muted max-w-[300px] break-words whitespace-normal">
                        <p className="break-words whitespace-normal">{message.content.text}</p>
                      </div>
                    )}

                    {isAttachmentMessageContent(message) && (
                      <>
                        {message.content.file_type === "file" && (
                          <div className="mt-2">
                            <a
                              href={message.content.file_url}
                              download={message.content.file_name}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-3 p-3 bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group max-w-md w-full"
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <div className="p-2 border bg-gray-100 dark:bg-gray-800 rounded group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors shadow-lg">
                                  <FileText className="size-4" />
                                </div>
                                <div className="flex flex-col min-w-0 flex-1">
                                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                    {message.content.file_name}
                                  </span>
                                  <div className="flex items-center">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      {getFileExtension(message.content.file_name)}
                                    </span>
                                    <LuDot />
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      {formatFileSize(message.content.file_size)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <Download className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
                            </a>
                          </div>
                        )}

                        {message.content.file_type === "image" && (
                          <img
                            src={message.content.file_url}
                            alt={message.content.file_name}
                            className="max-w-60 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm transition-transform"
                          />
                        )}
                      </>
                    )}
                  </div>

                  <button onClick={() => handleUnpinMessage(message)}>
                    <RiUnpinFill className="self-center text-dark-subtle" />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {pinnedMessages && pinnedMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center pb-12">
            {isPending && <PageLoader />}
            <img src={noMessages} alt="no attachments" />
            <h3 className="font-semibold text-lg text-dark-text">No pinned messages</h3>
            <p className="text-dark-subtle">Pin important messages to find them here easily.</p>
          </div>
        )}
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
