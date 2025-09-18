import UserAvatar from "@/components/UserAvatar";
import type { ChatMessage } from "@/types/chat";
import { formatChatDate, isIncomingChatMessage, isMessageHistoryItem } from "@/utils";
import { LuDot, LuReply } from "react-icons/lu";
import { useState } from "react";
import { LucideMoreVertical } from "lucide-react";
import { useChatReplyStore } from "@/stores/useChatReplyStore";
import { motion } from "motion/react";

type Props = {
  message: ChatMessage;
  showMetadata: boolean;
  isUsersMessage: boolean;
  onReply?: () => void;
  onAction?: (action: string) => void;
};

export default function ChatMessageItem({ message, showMetadata, isUsersMessage, onAction }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const setReplyingTo = useChatReplyStore((state) => state.setReplyingTo);
  const photoUrl = getPhotoUrl(message);

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
            {showMetadata && <UserAvatar className="size-8" name={message.nickname} photoUrl={photoUrl ?? undefined} />}
          </div>
        )}

        <div className={`flex flex-col ${isUsersMessage ? "items-end" : "items-start"}`}>
          {showMetadata && (
            <div className="text-dark-subtle flex space-x-1 items-center text-xs mb-1">
              {!isUsersMessage && (
                <>
                  <span>{message.nickname}</span>
                  <LuDot />
                </>
              )}
              <span>{formatChatDate(message.sent_at)}</span>
            </div>
          )}

          <div className="flex items-start gap-2">
            {isHovered && (
              <div className={`flex ${isUsersMessage ? "order-1" : "order-3"} gap-1 pt-1.5`}>
                <ActionButton icon={LuReply} onClick={() => setReplyingTo(message)} tooltip="Reply" />
                <ActionButton icon={LucideMoreVertical} onClick={() => onAction?.("more")} tooltip="More options" />
              </div>
            )}

            <div className={`${isUsersMessage ? "order-2" : "order-2"} relative`}>
              <div
                className={`${isUsersMessage ? "bg-brand-primary text-light-text" : "bg-muted text-dark-text"} p-2 rounded-sm`}
              >
                <p>{message.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function getPhotoUrl(message: ChatMessage): string | null {
  if (isIncomingChatMessage(message)) {
    return message.avatar;
  } else if (isMessageHistoryItem(message)) {
    return message.profile_picture;
  }
  return null;
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
