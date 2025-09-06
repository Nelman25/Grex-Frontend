import UserAvatar from "@/components/UserAvatar";
import type { ChatMessage } from "@/types/chat";
import { getRandomUserImage } from "@/utils";
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
                name="Jonel Villaver"
                photoUrl={getRandomUserImage()}
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
            <div className="text-dark-subtle flex space-x-1 items-center text-sm mb-1">
              <span>{message.nickname}</span>
              <LuDot />
              <span>10:32 pm</span>
            </div>
          )}
          <div className="flex space-x-2.5">
            <div className="bg-muted p-2 text-dark-text rounded-sm">
              <p>{message.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
