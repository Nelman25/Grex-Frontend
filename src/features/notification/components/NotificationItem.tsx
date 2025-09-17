import UserAvatar from "@/components/UserAvatar";
import { useFetchTasksQuery } from "@/features/tasks/hooks/queries/useFetchTasksQuery";
import type { Notification } from "@/types/notification";
import { extractTaskId, formatChatDate } from "@/utils";
import { useParams } from "react-router";

export default function NotificationItem({ notification }: { notification: Notification }) {
  const { workspace_id } = useParams();
  const { data: tasks } = useFetchTasksQuery(Number(workspace_id));
  const task_id = extractTaskId(notification.content);
  const task = tasks?.find((t) => t.task_id === task_id);

  return (
    <div className="w-full flex mb-2 cursor-pointer rounded">
      <div className="flex-1 flex items-center space-x-3">
        <UserAvatar className="self-start size-9" name="Jonel Villaver" photoUrl="" />
        <div className="flex-1">
          <p className={`text-sm ${notification.is_read ? "text-dark-subtle" : "text-dark-text"}`}>
            {RenderWorkspaceNotification(notification.content)}
          </p>

          {task && (
            <div>
              <span className="text-brand-primary">{task?.category}</span>
              <span className="mx-1">•</span>
              <span className="text-brand-light">{task?.title}</span>
            </div>
          )}

          <p className="text-dark-subtle">{formatChatDate(notification.delivered_at)}</p>
        </div>
        <div className="w-2 h-2 rounded-full bg-brand-primary" />
      </div>
    </div>
  );
}

function RenderWorkspaceNotification(content: string) {
  const addedRegex = /workspace\s+(.+?)\. You can now start collaborating!/i;
  const removedRegex = /workspace\s+(.+)$/i;

  if (addedRegex.test(content)) {
    const match = content.match(addedRegex);
    if (!match) return content;

    const workspaceName = match[1];
    return (
      <>
        You have been added to workspace <span className="text-brand-primary font-medium">{workspaceName}</span>. You can now
        start collaborating!
      </>
    );
  }

  if (removedRegex.test(content)) {
    const match = content.match(removedRegex);
    if (!match) return content;

    const workspaceName = match[1];
    return (
      <>
        You have been removed from workspace <span className="text-error font-medium">{workspaceName}</span>
      </>
    );
  }

  return content;
}
