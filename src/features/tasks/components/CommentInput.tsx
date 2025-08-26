import { Input } from "@/components/ui/input";
import { useCommentsStore } from "@/stores/useCommentsStore";
import type { Comment } from "@/types/comment";
import { useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";

export default function CommentInput({ taskId }: { taskId: number }) {
  const [comment, setComment] = useState("");
  const attachmentRef = useRef<HTMLInputElement | null>(null);
  const addComment = useCommentsStore((state) => state.addComment);

  const handleSendComment = () => {
    // content and sender_id + task_id on url parameter are the only needed fields when posting a comment
    // change this data on the actual testing, change the type of newComment to NewComment
    const newComment: Comment = {
      content: comment,
      sender_id: 1, // CHANGE THIS WHEN TESTING, THIS SHOULD BE THE ID OF THE AUTHENTICATED USER
      comment_id: Math.random(),
      task_id: taskId,
      created_at: new Date(),
      profile_picture: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 10
      )}.jpg`, // DUMMY PHOTO, CHANGE THIS TO THE PROFILE PIC OF THE AUTHENTICATED USER
      sender_name: "Jonel Villaver",
    };

    addComment(newComment); // temporary. This will be the actual post request for sending a new comment to the server
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
