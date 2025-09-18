import { useState, useRef } from "react";
import { ImageIcon, PlusCircle, SendHorizontal, SmileIcon } from "lucide-react";
import { getRandomUserImage, isIncomingChatMessage, isMessageHistoryItem } from "@/utils";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/context/auth-context";
import { useParams } from "react-router";
import { useFetchWorkspaceQuery } from "@/features/workspace/hooks/queries/useFetchWorkspaceQuery";
import { useWebsocket } from "../hooks/useWebsocket";
import { Textarea } from "@/components/ui/textarea";
import { useChatReplyStore } from "@/stores/useChatReplyStore";

export default function ChatInput() {
  const [mentionQuery, setMentionQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const replyingTo = useChatReplyStore((state) => state.replyingTo);
  const clearReply = useChatReplyStore((state) => state.clearReply);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { user } = useAuth();
  const { workspace_id } = useParams();
  const { data: project } = useFetchWorkspaceQuery(Number(workspace_id), user?.user_id);

  const { sendMessage } = useWebsocket({
    workspaceId: Number(workspace_id),
    userId: user?.user_id ?? 0,
  });

  const members = project?.members.map((member) => ({
    avatar: member.profile_picture,
    name: member.first_name + " " + member.last_name,
    id: member.user_id,
  }));

  const handleSendChat = () => {
    if (!textareaRef.current?.value.trim()) return;

    let message_id;

    if (replyingTo) {
      if (isIncomingChatMessage(replyingTo)) message_id = replyingTo.message_id;
      if (isMessageHistoryItem(replyingTo)) message_id = replyingTo.message_id;
    }

    sendMessage({
      type: "text",
      content: textareaRef.current.value,
      reply_to: message_id ?? null,
    });

    textareaRef.current.value = "";
    setMentionQuery("");
    setShowSuggestions(false);
    clearReply();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const cursorPos = e.target.selectionStart;
    const textBeforeCursor = value.slice(0, cursorPos);
    const atIndex = textBeforeCursor.lastIndexOf("@");

    if (atIndex !== -1) {
      const query = textBeforeCursor.slice(atIndex + 1);
      setMentionQuery(query);
      setShowSuggestions(true);
    } else {
      setMentionQuery("");
      setShowSuggestions(false);
    }
  };

  const handleSelectMention = (name: string) => {
    if (!textareaRef.current) return;

    const cursorPos = textareaRef.current.selectionStart;
    const value = textareaRef.current.value;
    const atIndex = value.lastIndexOf("@", cursorPos - 1);

    const newValue = value.slice(0, atIndex) + `@${name} ` + value.slice(cursorPos);

    textareaRef.current.value = newValue;
    textareaRef.current.focus();

    setMentionQuery("");
    setShowSuggestions(false);
  };

  const filteredMembers = members?.filter((m) => m.name.toLowerCase().includes(mentionQuery.toLowerCase()));

  return (
    <div className="">
      <div className="bg-muted rounded-xl flex items-end gap-2 p-2">
        {/* Quick Actions */}
        <div className="flex items-center gap-2 px-2">
          <button className="p-2 hover:bg-dark-muted rounded-full transition-colors">
            <PlusCircle className="size-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-dark-muted rounded-full transition-colors">
            <ImageIcon className="size-5 text-muted-foreground" />
          </button>
        </div>

        {/* Text Input */}
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            className="w-full resize-none border-none bg-transparent text-sm shadow-none 
              focus-visible:ring-0 focus:outline-none rounded-md py-2 min-h-[20px] max-h-32 
              overflow-y-auto placeholder:text-muted-foreground/50"
            placeholder="Write a message..."
            rows={1}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendChat();
              }
            }}
          />

          {/* Mentions Suggestions */}
          {showSuggestions && filteredMembers && filteredMembers.length > 0 && (
            <div
              className="absolute bottom-full mb-2 left-0 bg-dark-surface border 
              border-dark-muted rounded-lg shadow-lg overflow-hidden w-64"
            >
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="px-3 py-2 cursor-pointer hover:bg-muted/50 transition-colors 
                    flex items-center gap-2"
                  onClick={() => handleSelectMention(member.name)}
                >
                  <UserAvatar name={member.name} photoUrl={getRandomUserImage()} className="size-6" />
                  <span className="text-sm">{member.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 px-2">
          <button className="p-2 hover:bg-dark-muted rounded-full transition-colors">
            <SmileIcon className="size-5 text-muted-foreground" />
          </button>
          <button
            onClick={handleSendChat}
            className="p-2 hover:bg-brand-primary/80 bg-brand-primary rounded-full transition-colors"
          >
            <SendHorizontal className="size-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
