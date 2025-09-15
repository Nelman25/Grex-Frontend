import { useEffect, useRef, useCallback, useMemo } from "react";
import ChatMessageItem from "./ChatMessageItem";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@/context/auth-context";
import { useFetchMessagesQuery } from "../hooks/queries/useFetchMessagesQuery";
import { useParams } from "react-router";

export default function ChatMessageList() {
  const setMessages = useChatStore((s) => s.setMessages);
  const messages = useChatStore((s) => s.messages);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasInitializedRef = useRef(false);
  const hasScrolledToBottomRef = useRef(false);

  const { user } = useAuth();
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const workspaceId = Number(workspace_id);

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useFetchMessagesQuery(workspaceId);

  const fetchedMessages = useMemo(() => {
    return data?.pages?.flat() ?? [];
  }, [data?.pages]);

  const allMessages = useMemo(() => {
    const combined = [...fetchedMessages, ...messages];
    const uniqueMessages = combined.reduce((acc, message) => {
      const id = "message_id" in message ? message.message_id : "temp_id" in message ? message.temp_id : null;

      if (id) {
        const existingIndex = acc.findIndex((m) => ("message_id" in m ? m.message_id : "temp_id" in m ? m.temp_id : null) === id);

        if (existingIndex !== -1) {
          if ("message_id" in message) {
            acc[existingIndex] = message;
          }
        } else {
          acc.push(message);
        }
      } else {
        acc.push(message);
      }

      return acc;
    }, [] as typeof combined);

    // NOTE: this is probably not the best way to sort messages, fix this later
    return uniqueMessages.sort((a, b) => {
      if ("message_id" in a && "message_id" in b) {
        return a.message_id - b.message_id;
      }
      if ("message_id" in a) return -1;
      if ("message_id" in b) return 1;
      if ("temp_id" in a && "temp_id" in b) {
        return a.temp_id.localeCompare(b.temp_id);
      }
      return 0;
    });
  }, [fetchedMessages, messages]);

  useEffect(() => {
    if (!hasInitializedRef.current && status === "success" && fetchedMessages.length > 0) {
      setMessages(fetchedMessages);
      hasInitializedRef.current = true;
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "instant" });
        hasScrolledToBottomRef.current = true;
      }, 100);
    }
  }, [status, fetchedMessages, setMessages]);

  useEffect(() => {
    if (hasScrolledToBottomRef.current && messages.length > 0) {
      const container = containerRef.current;
      if (container) {
        const isNearBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 100;
        if (isNearBottom) {
          setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 10);
        }
      }
    }
  }, [messages.length]);

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

        {!hasNextPage && allMessages.length > 0 && (
          <div className="flex justify-center py-2">
            <div className="text-xs text-muted-foreground">No more messages</div>
          </div>
        )}

        {allMessages.map((message, index) => {
          const isUsersMessage = message.sender_id === user?.user_id;
          const prevMsg = allMessages[index - 1];
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
