import { uploadFileToCloudinary, uploadImageToCloudinary } from "@/api/cloudinary";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UserAvatar from "@/components/UserAvatar";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants/cloudinary";
import { useAuth } from "@/context/auth-context";
import { useFetchWorkspaceMembersQuery } from "@/features/workspace/hooks/queries/useFetchWorkspaceMembersQuery";
import { useChatAttachmentStore } from "@/stores/useChatAttachmentStore";
import { useChatReplyStore } from "@/stores/useChatReplyStore";
import { getRandomUserImage, isIncomingChatMessage, isMessageHistoryItem } from "@/utils";
import { ImageIcon, PlusCircle, SendHorizontal, SmileIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useParams } from "react-router";
import { useWebsocket } from "../hooks/useWebsocket";

export default function ChatInput() {
  const { user } = useAuth();
  const { workspace_id } = useParams();
  const workspaceId = Number(workspace_id);

  const [mentionQuery, setMentionQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const replyingTo = useChatReplyStore((state) => state.replyingTo);
  const clearReply = useChatReplyStore((state) => state.clearReply);
  const setAttachment = useChatAttachmentStore((state) => state.setAttachment);
  const attachment = useChatAttachmentStore((state) => state.attachment);
  const removeAttachment = useChatAttachmentStore((state) => state.removeAttachment);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const attachmentRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const { data: members = [] } = useFetchWorkspaceMembersQuery(workspaceId);
  const { sendMessage } = useWebsocket({
    workspaceId: Number(workspace_id),
    userId: user?.user_id ?? 0,
  });

  const handleUploadAttachment = async (event: React.ChangeEvent<HTMLInputElement>, fileType: "file" | "image") => {
    const { files } = event.target;

    if (!files || files.length === 0) return;

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    if (fileType === "file") {
      const file = await uploadFileToCloudinary(data);
      setAttachment({
        file_name: files[0].name,
        file_type: "file",
        file_size: file.bytes,
        file_url: file.secure_url,
      });
      return;
    } else if (fileType === "image") {
      const image = await uploadImageToCloudinary(data);
      setAttachment({
        file_name: files[0].name,
        file_type: "image",
        file_size: image.bytes,
        file_url: image.secure_url,
      });
    }
  };

  const handleSendChat = () => {
    if (textareaRef.current?.value.trim() === "" && !attachment) return;

    let message_id;

    if (replyingTo) {
      if (isIncomingChatMessage(replyingTo)) message_id = replyingTo.message_id;
      if (isMessageHistoryItem(replyingTo)) message_id = replyingTo.message_id;
    }

    if (textareaRef.current?.value.trim()) {
      sendMessage({
        type: "text",
        content: {
          text: textareaRef.current.value,
        },
        reply_to: message_id ?? null,
      });
    }

    if (attachment) {
      sendMessage({
        type: "attachment",
        content: attachment,
        reply_to: message_id ?? null,
      });
    }

    if (textareaRef.current) textareaRef.current.value = "";

    setShowSuggestions(false);
    setMentionQuery("");
    removeAttachment();
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

  console.log(attachment);
  const filteredMembers = members?.filter((m) => m.nickname.toLowerCase().includes(mentionQuery.toLowerCase()));

  return (
    <div className="">
      <div className="bg-muted rounded-xl flex items-end gap-2 p-2">
        {/* Quick Actions */}
        <div className="flex items-center gap-2 px-2">
          <button
            onClick={() => attachmentRef.current?.click()}
            className="p-2 hover:bg-dark-muted rounded-full transition-colors"
          >
            <PlusCircle className="size-5 text-muted-foreground" />
          </button>
          <button onClick={() => imageRef.current?.click()} className="p-2 hover:bg-dark-muted rounded-full transition-colors">
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
                  key={member.user_id}
                  className="px-3 py-2 cursor-pointer hover:bg-muted/50 transition-colors 
                    flex items-center gap-2"
                  onClick={() => handleSelectMention(member.nickname)}
                >
                  <UserAvatar name={member.nickname} photoUrl={getRandomUserImage()} className="size-6" />
                  <span className="text-sm">{member.nickname}</span>
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

      <Input
        type="file"
        accept="image/*"
        className="hidden"
        ref={imageRef}
        onChange={(e) => handleUploadAttachment(e, "image")}
      />
      <Input
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
        className="hidden"
        ref={attachmentRef}
        onChange={(e) => handleUploadAttachment(e, "file")}
      />
    </div>
  );
}
