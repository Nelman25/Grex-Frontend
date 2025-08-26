import type { Task } from "@/types/task";
import { Label } from "@radix-ui/react-label";
import { formatDate } from "@/utils/index";
import { CiCalendar } from "react-icons/ci";

export default function TaskDueDate({ task }: { task: Task }) {
  return (
    <div className="grid grid-cols-2 gap-4 items-center">
      <Label>Due Date</Label>
      <div className="flex items-center space-x-4">
        <CiCalendar />
        <p>{formatDate(task.deadline)}</p>
      </div>
    </div>
  );
}
