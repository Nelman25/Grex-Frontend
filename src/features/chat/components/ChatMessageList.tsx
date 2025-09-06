import { useEffect, useRef } from "react";
import ChatMessageItem from "./ChatMessageItem";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@/context/auth-context";

export default function ChatMessageList() {
  const messages = useChatStore((state) => state.messages);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col gap-2 max-h-[690px] overflow-y-scroll py-4">
      {messages.map((message, index) => {
        const isUsersMessage = message.sender_id === user?.user_id; // change this to user_id
        const prevMsg = messages[index - 1];
        const showMetadata =
          !prevMsg || prevMsg.sender_id !== message.sender_id;

        return (
          <ChatMessageItem
            key={index}
            message={message}
            showMetadata={showMetadata}
            isUsersMessage={isUsersMessage}
          />
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
