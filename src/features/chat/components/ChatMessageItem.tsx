import UserAvatar from "@/components/UserAvatar";
import type { ChatMessage } from "@/types/chat";
import {
  formatChatDate,
  isIncomingChatMessage,
  isMessageHistoryItem,
} from "@/utils";
import { LuDot } from "react-icons/lu";

type Props = {
  message: ChatMessage;
  showMetadata: boolean;
  isUsersMessage: boolean;
};

export default function ChatMessageItem({
  message,
  showMetadata,
  isUsersMessage,
}: Props) {
  let photoUrl: string | null = null;

  if (isIncomingChatMessage(message)) {
    photoUrl = message.avatar;
  } else if (isMessageHistoryItem(message)) {
    photoUrl = message.profile_picture;
  }

  return (
    <div className={`w-full flex px-4 ${isUsersMessage && "justify-end"}`}>
      <div
        className={`max-w-[60%] flex space-x-3 ${
          isUsersMessage && "flex-row-reverse gap-3 pr-6"
        }`}
      >
        {!isUsersMessage && (
          <div className="pt-6 w-8">
            {showMetadata && (
              <UserAvatar
                className="size-8"
                name={message.nickname}
                photoUrl={photoUrl ?? undefined}
              />
            )}
          </div>
        )}

        <div
          className={`flex flex-col ${
            isUsersMessage ? "items-end" : "items-start"
          }`}
        >
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
          <div className="flex space-x-2.5">
            <div className={`${isUsersMessage ? "bg-brand-primary text-light-text" : "bg-muted text-dark-text"} p-2 rounded-sm`}>
              <p >{message.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
