import { useFetchTaskCommentsQuery } from "@/features/workspace/hooks/queries/useFetchTaskCommentsQuery";
import { toast } from "sonner";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
import noComments from "@/assets/noMessages.svg";

type Props = {
  taskId: number;
};

export default function TaskComments({ taskId }: Props) {
  const { data: comments, error } = useFetchTaskCommentsQuery(taskId);

  if (error) toast(error.message);

  return (
    <div className="h-[700px]">
      <div className="max-h-[530px] h-[530px] overflow-y-scroll">
        {comments && comments.length === 0 && (
          <div className="flex flex-col items-center justify-between h-60">
            <img src={noComments} alt="no attachments" />
            <h3 className="font-semibold text-lg text-dark-text">No comments here</h3>
            <p className="text-dark-subtle">Share updates, ideas, or feedback to keep everyone aligned</p>
          </div>
        )}
        
        {comments?.map((comment) => (
          <CommentItem key={comment.comment_id} comment={comment} />
        ))}
      </div>
      <CommentInput taskId={taskId} />
    </div>
  );
}
