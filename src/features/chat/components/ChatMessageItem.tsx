import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/context/auth-context";
import { useChatReplyStore } from "@/stores/useChatReplyStore";
import type { ChatMessage } from "@/types/chat";
import { formatChatDate, formatFileSize, getFileExtension, isIncomingChatMessage, isMessageHistoryItem } from "@/utils";
import { isAttachmentMessageContent, isTextMessageContent } from "@/utils/typeGuards";
import { Download, FileText } from "lucide-react";
import { motion } from "motion/react";
import { memo, useCallback, useState } from "react";
import { BsFillPinAngleFill } from "react-icons/bs";
import { LuDot, LuReply } from "react-icons/lu";
import { useParams } from "react-router";
import { toast } from "sonner";
import { usePinMessageMutation } from "../hooks/mutations/usePinMessageMutation";
import { useFetchRepliedMessageQuery } from "../hooks/queries/useFetchRepliedMessageQuery";

const getMessageId = (message: ChatMessage): number | undefined => {
  if (isIncomingChatMessage(message)) return message.message_id;
  if (isMessageHistoryItem(message)) return message.message_id;
  return undefined;
};

const getRepliedTo = (message: ChatMessage): number | null => {
  if (isIncomingChatMessage(message)) return message.reply_to;
  if (isMessageHistoryItem(message)) return message.reply_to;
  return null;
};

type Props = {
  message: ChatMessage;
  showMetadata: boolean;
  isUsersMessage: boolean;
};

function ChatMessageItem({ message, showMetadata, isUsersMessage }: Props) {
  const { user } = useAuth();
  const { workspace_id } = useParams();
  const workspaceId = Number(workspace_id);

  const [isHovered, setIsHovered] = useState(false);

  const setReplyingTo = useChatReplyStore((state) => state.setReplyingTo);
  const reply_to = getRepliedTo(message);

  const { mutate: pinMessage } = usePinMessageMutation(workspaceId);
  const { data: replied } = useFetchRepliedMessageQuery(workspaceId, reply_to);

  const messageId = getMessageId(message);
  const isPinned = isMessageHistoryItem(message) && message.is_pinned;

  const handlePinMessage = useCallback(() => {
    if (!messageId || !user) return;

    pinMessage({ message_id: messageId, pinned_by: user.user_id });
    toast.success("Message pinned");
  }, [messageId, pinMessage, user]);

  return (
    <motion.div
      className={`w-full flex px-4 ${isUsersMessage && "justify-end"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, x: isUsersMessage ? 40 : -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isUsersMessage ? 40 : -40 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className={`max-w-[60%] flex space-x-3 ${isUsersMessage && "flex-row-reverse gap-3 pr-6"}`}>
        {!isUsersMessage && (
          <div className="pt-6 w-8">
            {showMetadata && <UserAvatar className="size-8" name={message.nickname} photoUrl={message.avatar ?? undefined} />}
          </div>
        )}

        <div className={`flex flex-col max-w-[90%] min-w-[150px] ${isUsersMessage ? "items-end" : "items-start"}`}>
          {replied && (
            <div className={`flex flex-col text-sm ${isUsersMessage ? "items-end" : "items-start"}`}>
              <p>
                <span className="font-semibold">{isUsersMessage ? "You" : message.nickname}</span> replied to{" "}
                <span className="font-semibold">{replied.sender_name}</span>
              </p>

              <div className="p-1 rounded bg-dark-muted/70 text-dark-subtle max-w-fit">{replied.content}</div>
            </div>
          )}
          {!reply_to && showMetadata && (
            <div className="text-dark-subtle flex space-x-1 items-center text-xs mb-1">
              {!isUsersMessage && (
                <>
                  <span>{message.nickname}</span>
                  <LuDot />
                </>
              )}
              <span>{formatChatDate(message.sent_at)}</span>
              {isPinned && (
                <>
                  <LuDot /> <span>Pinned</span>
                </>
              )}
            </div>
          )}

          <div className={`flex items-start gap-2 flex-1 min-w-[300px] ${isUsersMessage ? "justify-end" : "justify-start"}`}>
            <div className={`min-w-[20%] self-center ${isUsersMessage ? "order-1" : "order-2"} gap-1 pt-1.5`}>
              {isHovered && (
                <div className="flex space-x-2 max-w-[80px]">
                  <ActionButton icon={LuReply} onClick={() => setReplyingTo(message)} tooltip="Reply" />
                  <ActionButton icon={BsFillPinAngleFill} onClick={handlePinMessage} tooltip="More options" />
                </div>
              )}
            </div>

            <div className={`${isUsersMessage ? "order-2" : "order-1"} relative`}>
              {isTextMessageContent(message) && (
                <div
                  className={`${isUsersMessage ? "bg-brand-primary text-light-text" : "bg-muted text-dark-text"} p-2 rounded-sm`}
                >
                  <p>{message.content.text}</p>
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
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ActionButton({
  icon: Icon,
  onClick,
  tooltip,
}: {
  icon: React.ComponentType<{ size?: number | string }>;
  onClick?: () => void;
  tooltip: string;
}) {
  return (
    <button
      className="p-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
      onClick={onClick}
      title={tooltip}
    >
      <Icon size={16} />
    </button>
  );
}

const areEqual = (prevProps: Props, nextProps: Props) => {
  if (prevProps.showMetadata !== nextProps.showMetadata || prevProps.isUsersMessage !== nextProps.isUsersMessage) {
    return false;
  }

  const prevMessage = prevProps.message;
  const nextMessage = nextProps.message;

  const prevMessageId = getMessageId(prevMessage);
  const nextMessageId = getMessageId(nextMessage);

  if (prevMessageId !== nextMessageId) return false;

  return prevMessage.content === nextMessage.content && prevMessage.sent_at === nextMessage.sent_at;
};

export default memo(ChatMessageItem, areEqual);
