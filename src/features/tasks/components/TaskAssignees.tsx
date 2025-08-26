import { Label } from "@radix-ui/react-label";

export default function TaskAssignees() {
  // THIS COMPONENT WILL HANDLE CASES IF A TASK HAS MANY ASSIGNEES
  return (
    <div className="grid grid-cols-2 gap-4 items-center">
      <Label>Assignee/s</Label>
      <div className="flex items-center space-x-4">
        <img
          src="https://avatar.iran.liara.run/public/boy"
          alt="assignee's avatar"
          className="size-8"
        />
        <p>Jonel Villaver</p>
      </div>
    </div>
  );
}
