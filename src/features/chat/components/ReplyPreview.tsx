import { useAuth } from "@/context/auth-context";
import { useChatReplyStore } from "@/stores/useChatReplyStore";
import { isTextMessageContent } from "@/utils/typeGuards";
import { IoCloseOutline } from "react-icons/io5";

export default function ReplyPreview() {
  const { user } = useAuth();
  const replyingTo = useChatReplyStore((state) => state.replyingTo);
  const clearReply = useChatReplyStore((state) => state.clearReply);
  const isCurrentUser = replyingTo?.sender_id === user?.user_id;

  return (
    <div className="w-full flex pb-3 px-3">
      <div className="flex-1">
        <p className="text-base block">
          <span className="text-dark-text font-medium">Replying to </span>
          <span className="text-dark-text/90">{isCurrentUser ? "yourself" : replyingTo?.nickname}</span>
        </p>
        <p className="text-dark-subtle line-clamp-1">
          {replyingTo && isTextMessageContent(replyingTo) ? replyingTo.content.text : "Attachment"}
        </p>
      </div>

      <button className="p-1 rounded-full" onClick={() => clearReply()}>
        <IoCloseOutline />
      </button>
    </div>
  );
}
