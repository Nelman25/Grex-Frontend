import { useState, useRef } from "react";
import { Plus } from "lucide-react";
import { MdOutlineAttachFile } from "react-icons/md";
import { getRandomUserImage } from "@/utils";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/context/auth-context";
import { useParams } from "react-router";
import { useFetchWorkspaceQuery } from "@/features/workspace/hooks/queries/useFetchWorkspaceQuery";
import { useWebsocket } from "../hooks/useWebsocket";

export default function ChatInput() {
  const [mentionQuery, setMentionQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { user } = useAuth();
  const { workspace_id } = useParams();
  const { data: project } = useFetchWorkspaceQuery(
    Number(workspace_id),
    user?.user_id
  );

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

    sendMessage({
      type: "text",
      content: textareaRef.current.value,
      reply_to: null,
    });

    textareaRef.current.value = "";
    setMentionQuery("");
    setShowSuggestions(false);
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

    const newValue =
      value.slice(0, atIndex) + `@${name} ` + value.slice(cursorPos);

    textareaRef.current.value = newValue;
    textareaRef.current.focus();

    setMentionQuery("");
    setShowSuggestions(false);
  };

  const filteredMembers = members?.filter((m) =>
    m.name.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  return (
    <div className="bg-muted mx-2 rounded-md p-2 flex flex-col gap-2 relative">
      <textarea
        ref={textareaRef}
        className="w-full resize-none border-none bg-muted shadow-none focus-visible:ring-0 focus:outline-none rounded-md p-2 min-h-[2.5rem] max-h-32 overflow-y-auto"
        placeholder="Type a new message"
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendChat();
          }
        }}
      />

      {showSuggestions && filteredMembers && filteredMembers.length > 0 && (
        <div className="absolute bottom-28 left-2 bg-dark-muted border border-white/20 rounded-md shadow-md z-10">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="px-4 py-2 cursor-pointer hover:bg-muted flex space-x-2 items-center"
              onClick={() => handleSelectMention(member.name)}
            >
              <UserAvatar name={member.name} photoUrl={getRandomUserImage()} />
              <span>{member.name}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <button className="size-8 bg-dark-muted border border-white/20 rounded-sm flex justify-center items-center">
          <Plus className="size-4" />
        </button>
        <button>
          <MdOutlineAttachFile className="size-5 font-thin text-white/60" />
        </button>
      </div>
    </div>
  );
}
