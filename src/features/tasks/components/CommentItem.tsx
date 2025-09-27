import UserAvatar from "@/components/UserAvatar";
import type { Comment } from "@/types/comment";
import { formatChatDate } from "@/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { BsDot } from "react-icons/bs";
import FileAttachment from "./FileAttachment";

type Props = {
  comment: Comment;
};

export default function CommentItem({ comment }: Props) {
  return (
    <div className="flex space-x-3 mx-4 my-2">
      <Avatar>
        <UserAvatar name={comment.sender_name} photoUrl={comment.profile_picture} />
      </Avatar>

      <div className="">
        <div className="flex items-center">
          <h3 className="text-dark-subtle text-sm font-medium">{comment.sender_name}</h3>
          <BsDot className="text-dark-subtle" />
          <h4 className="text-dark-subtle text-sm">{formatChatDate(comment.created_at)}</h4>
        </div>
        <p className="text-dark-text">{comment.content}</p>

        <FileAttachment attachment={comment.attachments} />
      </div>
    </div>
  );
}
