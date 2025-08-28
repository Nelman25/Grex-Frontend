import { useCommentsStore } from "@/stores/useCommentsStore";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

type Props = {
  taskId: number;
};

export default function TaskComments({ taskId }: Props) {
  const comments = useCommentsStore((state) => state.comments).filter(
    (c) => c.task_id === taskId
  );

  return (
    <div className="h-[300px] bg-dark-muted">
      <header className="w-full p-3 border-b border-b-dark-subtle">
        <span className="text-dark-text text-sm font-medium">Comments</span>
      </header>

      <div className="max-h-[200px] h-[200px] overflow-y-scroll">
        {comments.length === 0 && (
          <div className="w-full flex justify-center mt-12">
            <p>No comments yet.</p>
          </div>
        )}

        {comments.map((comment) => (
          <CommentItem key={comment.comment_id} comment={comment} />
        ))}
      </div>
      <CommentInput taskId={taskId} />
    </div>
  );
}
