import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/context/auth-context";
import { useChatReplyStore } from "@/stores/useChatReplyStore";
import type { ChatMessage } from "@/types/chat";
import { formatChatDate, isIncomingChatMessage, isMessageHistoryItem } from "@/utils";
import { motion } from "motion/react";
import { memo, useCallback, useState } from "react";
import { BsFillPinAngleFill } from "react-icons/bs";
import { LuDot, LuReply } from "react-icons/lu";
import { useParams } from "react-router";
import { usePinMessageMutation } from "../hooks/mutations/usePinMessageMutation";
import { toast } from "sonner";

type Props = {
  message: ChatMessage;
  showMetadata: boolean;
  isUsersMessage: boolean;
};

function ChatMessageItem({ message, showMetadata, isUsersMessage }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const setReplyingTo = useChatReplyStore((state) => state.setReplyingTo);
  const photoUrl = getPhotoUrl(message);
  const { workspace_id } = useParams();
  const { user } = useAuth();
  const { mutate: pinMessage } = usePinMessageMutation(Number(workspace_id));

  const handlePinMessage = useCallback(() => {
    let message_id;

    if (isIncomingChatMessage(message)) message_id = message.message_id;
    if (isMessageHistoryItem(message)) message_id = message.message_id;
    if (!message_id || !user) return;

    pinMessage({ message_id, pinned_by: user?.user_id });
    toast.success("Message pinned");
  }, [message, pinMessage, user]);

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

        <div className={`flex flex-col max-w-[90%] min-w-[150px] ${isUsersMessage ? "items-end" : "items-start"}`}>
          {showMetadata && (
            <div className="text-dark-subtle flex space-x-1 items-center text-xs mb-1">
              {!isUsersMessage && (
                <>
                  <span>{message.nickname}</span>
                  <LuDot />
                </>
              )}
              <span>{formatChatDate(message.sent_at)}</span>
              {isMessageHistoryItem(message) && message.is_pinned && (
                <>
                  <LuDot /> <span>Pinned</span>
                </>
              )}
            </div>
          )}

          <div className="flex items-start gap-2">
            <div className={`min-w-[20%] self-center ${isUsersMessage ? "order-1" : "order-3"} gap-1 pt-1.5`}>
              {isHovered && (
                <div className="flex space-x-2">
                  <ActionButton icon={LuReply} onClick={() => setReplyingTo(message)} tooltip="Reply" />
                  <ActionButton icon={BsFillPinAngleFill} onClick={handlePinMessage} tooltip="More options" />
                </div>
              )}
            </div>

            <div className={`${isUsersMessage ? "order-2" : "order-1"} relative`}>
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

const areEqual = (prevProps: Props, nextProps: Props) => {
  if (prevProps.showMetadata !== nextProps.showMetadata || prevProps.isUsersMessage !== nextProps.isUsersMessage) {
    return false;
  }

  const prevMessage = prevProps.message;
  const nextMessage = nextProps.message;

  if ("message_id" in prevMessage && "message_id" in nextMessage) {
    if (prevMessage.message_id !== nextMessage.message_id) return false;
  } else if ("temp_id" in prevMessage && "temp_id" in nextMessage) {
    if (prevMessage.temp_id !== nextMessage.temp_id) return false;
  } else {
    return false;
  }

  return prevMessage.content === nextMessage.content && prevMessage.sent_at === nextMessage.sent_at;
};

export default memo(ChatMessageItem, areEqual);
