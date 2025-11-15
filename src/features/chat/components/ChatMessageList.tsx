import { useAuth } from "@/features/auth/hooks/auth-context";
import { useChatStore } from "@/stores/useChatStore";
import { useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useSyncMessagesToStore } from "../hooks/useSyncMessagesToStore";
import ChatMessageItem from "./ChatMessageItem";

export default function ChatMessageList() {
  const { user } = useAuth();
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const workspaceId = Number(workspace_id);

  const messagesByWorkspace = useChatStore((s) => s.messagesByWorkspace);
  const messages = messagesByWorkspace.get(workspaceId)?.messages || [];

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useSyncMessagesToStore(workspaceId);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const isNearBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 100;
      if (isNearBottom) {
        setTimeout(() => {
          bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 10);
      }
    }
  }, []);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    if (container.scrollTop < 100 && hasNextPage && !isFetchingNextPage) {
      const previousScrollHeight = container.scrollHeight;
      const previousScrollTop = container.scrollTop;
      fetchNextPage().then(() => {
        requestAnimationFrame(() => {
          if (container) {
            const newScrollHeight = container.scrollHeight;
            const scrollDiff = newScrollHeight - previousScrollHeight;
            container.scrollTop = previousScrollTop + scrollDiff;
          }
        });
      });
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  if (status === "pending") {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-error">Error loading messages: {error?.message}</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-[600px] h-full max-h-[650px] flex flex-col overflow-y-auto py-4 px-2 sm:px-4 bg-dark-surface"
      style={{ scrollBehavior: "smooth" }}
    >
      <div className="flex-1" />

      <div className="flex flex-col gap-2">
        {isFetchingNextPage && (
          <div ref={topRef} className="flex justify-center py-2">
            <div className="text-xs text-muted-foreground animate-pulse">Loading older messages...</div>
          </div>
        )}

        {!hasNextPage && messages?.length > 0 && (
          <div className="flex justify-center py-2">
            <div className="text-xs text-muted-foreground">No more messages</div>
          </div>
        )}

        {messages?.map((message, index) => {
          const isUsersMessage = message.sender_id === user?.user_id;
          const prevMsg = messages[index - 1];
          const showMetadata = !prevMsg || prevMsg.sender_id !== message.sender_id;

          const key =
            "message_id" in message && message.message_id
              ? `msg-${message.message_id}`
              : "temp_id" in message && message.temp_id
              ? `temp-${message.temp_id}`
              : `idx-${index}-${"sent_at" in message && message.sent_at}`;

          return <ChatMessageItem key={key} message={message} showMetadata={showMetadata} isUsersMessage={isUsersMessage} />;
        })}
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
