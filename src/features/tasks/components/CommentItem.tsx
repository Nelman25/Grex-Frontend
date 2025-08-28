import type { Comment } from "@/types/comment";
import { getInitials } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { formatDate } from "@/utils";
import { BsDot } from "react-icons/bs";

type Props = {
  comment: Comment;
};

export default function CommentItem({ comment }: Props) {
  return (
    <div className="flex space-x-3 mx-4 my-2">
      <Avatar>
        <AvatarImage
          src={comment.profile_picture}
          alt="user profile"
          className="size-10 rounded-full"
        />
        <AvatarFallback>{getInitials(comment.sender_name)}</AvatarFallback>
      </Avatar>

      <div className="">
        <div className="flex items-center">
          <h3 className="text-dark-subtle text-sm font-medium">
            {comment.sender_name}
          </h3>
          <BsDot className="text-dark-subtle" />
          <h4 className="text-dark-subtle text-sm">
            {formatDate(comment.created_at)}
          </h4>
        </div>
        <p className="text-dark-text">{comment.content}</p>
      </div>
    </div>
  );
}
