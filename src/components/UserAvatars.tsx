import type { TaskAssignee } from "@/types/task";
import UserAvatar from "./UserAvatar";

type Props = {
  assignees: Pick<TaskAssignee, "avatar" | "name">[];
};

// TODO: improve this component by adding hover card to each avatar

export default function UserAvatars({ assignees }: Props) {
  const length = assignees.length;

  return (
    <div className="relative flex items-center">
      {assignees.slice(0, 5).map((assignee, index) => (
        <UserAvatar
          key={`${index}-${assignee.name}`}
          name={assignee.name}
          photoUrl={assignee.avatar}
          className="border-2 border-dark-muted -ml-2 first:ml-0"
        />
      ))}
      {length > 5 && (
        <p className="text-sm ml-2 text-dark-subtle">+ {length - 5} more</p>
      )}
    </div>
  );
}
