import { Input } from "@/components/ui/input";
import type { NewComment } from "@/types/comment";
import { useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import { useCreateCommentMutation } from "../hooks/mutations/useCreateCommentMutation";
import { useAuth } from "@/context/auth-context";

export default function CommentInput({ taskId }: { taskId: number }) {
  const [comment, setComment] = useState("");
  const attachmentRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuth();
  const { mutate: addComment } = useCreateCommentMutation(taskId);

  const handleSendComment = () => {
    if (!user) return;

    const newComment: NewComment = {
      content: comment,
      sender_id: user.user_id,
    };

    addComment(newComment);
    setComment("");
  };

  return (
    <div className="mx-4 my-2 relative">
      <Input
        className="w-full pr-16"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSendComment();
          }
        }}
      />
      <Input type="file" className="hidden" ref={attachmentRef} />

      <button
        className="p-2 absolute top-0.5 right-0"
        onClick={handleSendComment}
      >
        <BsSend />
      </button>
      <button
        className="p-2 absolute top-0.5 right-7"
        onClick={() => attachmentRef.current?.click()}
      >
        <MdAttachFile />
      </button>
    </div>
  );
}
