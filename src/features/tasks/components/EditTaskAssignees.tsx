import { Input } from "@/components/ui/input";
import { MOCK_SPECIFIC_WORKSPACE } from "@/mocks/projects";
import { useAssigneeStore } from "@/stores/useAssigneesStore";
import { memo, useState } from "react";
import AssigneeItem from "./AssigneeItem";
import { Label } from "@/components/ui/label";

function EditTaskAssignees({ id }: { id: number }) {
  // TODO: GET task assignees and EDIT assignees
  // GET assignees -> /task/${task_id}/assignment
  // query key: ["assignees", { task_id: id }]

  // POST -> /task/${task_id}/assignment/${user_id}
  // invalidate query: ["assignees", { task_id: id }]

  // DELETE -> /task/${task_id}/assignment/${user_id}
  // invalidate query: ["assignees", { task_id: id }]

  // JUST CHANGE THIS TO THE ACTUAL REQUEST
  const assignees = useAssigneeStore((state) => state.assignees).filter(
    (a) => a.task_id === id
  );
  const addAssignee = useAssigneeStore((state) => state.addAssignee);
  // Yung array of members is manggagaling sa query na to:
  // query keys = ["workspace", { workspace_id }]
  // cached naman sya since nafetch na sya sa WorkspaceContainer component

  const members = MOCK_SPECIFIC_WORKSPACE.members; // all members of the selected workspace
  const [newAssignee, setNewAssignee] = useState(""); // query, the name of the assignee you're searching

  // exclude anyone already in assignees, then checks if either first_name of last_name contains the query
  const availableMembers = members.filter(
    (member) =>
      !assignees.some((a) => a.user_id === member.user_id) &&
      (member.first_name.toLowerCase().includes(newAssignee) ||
        member.last_name.toLowerCase().includes(newAssignee))
  );

  const handleAddAssignee = () => {
    const assignee = availableMembers[0];

    if (!assignee) return;

    addAssignee({
      task_id: id,
      user_id: assignee.user_id,
      avatar: assignee.profile_picture ?? "",
      name: assignee.first_name + " " + assignee.last_name,
    });

    setNewAssignee("");
  };

  return (
    <div className="grid gap-4">
      <Label>Assignee/s</Label>
      <div className="flex gap-2 flex-wrap">
        {assignees.map((assignee) => (
          <AssigneeItem key={assignee.user_id} assignee={assignee} />
        ))}
      </div>

      <div className="relative">
        <Input
          className="text-sm"
          value={newAssignee}
          onChange={(e) => setNewAssignee(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddAssignee();
            }
          }}
        />
        {newAssignee && (
          <div className="flex flex-col items-start bg-dark-muted px-4 mt-1 rounded absolute">
            {availableMembers.map((member) => (
              <div className="w-full bg-dark-muted rounded my-2 flex gap-2">
                <img
                  src={member.profile_picture ?? ""}
                  alt="user avatar"
                  className="size-7 rounded-full"
                />
                <span>
                  {member.first_name} {member.last_name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(EditTaskAssignees);
