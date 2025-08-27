import UserAvatars from "@/components/UserAvatars";
import { MOCK_TASK_ASSIGNEES } from "@/mocks/assignees";
import { Label } from "@radix-ui/react-label";

// NOTES:
// If the task only has 1 assignee, show the name of the assignee,
// If 2-5 assignees, only show their avatars.
// if more than 5, only show the 5 assignees and the rest will be
// displayed like this: +5 more

export default function TaskAssignees({ id }: { id: number }) {
  // this component will only receive the task_id as prop then
  // it will handle the job of getting the assignees of a task.
  // REQUEST HERE: /task/${task_id}/assignment
  // query keys -> "assignees", {task_id}

  const assignees = MOCK_TASK_ASSIGNEES.filter((i) => i.task_id === id);
  const avatars = assignees.map((i) => i.avatar);
  const length = avatars.length;

  return (
    <div className="grid grid-cols-2 gap-4 items-center">
      <Label>Assignee/s</Label>

      {length === 0 && <p>No member assigned.</p>}

      {length === 1 && (
        <div className="flex items-center space-x-4">
          <img
            src={assignees[0].avatar}
            alt="assignee's avatar"
            className="size-8"
          />
          <p>{assignees[0].name}</p>
        </div>
      )}

      {length > 2 && <UserAvatars images={avatars} />}
    </div>
  );
}
