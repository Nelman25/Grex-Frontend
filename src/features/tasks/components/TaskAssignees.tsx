import UserAvatar from "@/components/UserAvatar";
import UserAvatars from "@/components/UserAvatars";
import { Label } from "@radix-ui/react-label";
import { useFetchTaskAssigneesQuery } from "../hooks/queries/useFetchTaskAssigneesQuery";

export default function TaskAssignees({ id }: { id: number }) {
  const { data: tasksAssignees } = useFetchTaskAssigneesQuery(id);

  if (!tasksAssignees) return <p>No assignees yet.</p>;

  const assignees = tasksAssignees.map((i) => ({
    avatar: i.avatar,
    name: i.name,
  }));
  const length = assignees.length;

  return (
    <div className="grid grid-cols-2 gap-4 items-center">
      <Label>Assignee/s</Label>

      {length === 0 && <p>No member assigned.</p>}

      {length === 1 && (
        <div className="flex items-center space-x-4">
          <UserAvatar name={assignees[0].name} photoUrl={assignees[0].avatar} />

          <p>{assignees[0].name}</p>
        </div>
      )}

      {length > 2 && <UserAvatars users={assignees} />}
    </div>
  );
}
