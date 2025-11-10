import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { capitalizeWord, getPrioLevelStyle, getStatusStyle } from "@/utils";
import { Clock, Flag } from "lucide-react";
import type { Task } from "../schemas/task.schema";

export default function TaskFields({ task }: { task: Task }) {
  return (
    <div className="max-w-[400px] grid grid-cols-2 gap-4 items-center">
      <div className="self-start">
        <Label className="text-base">Fields</Label>
      </div>
      <div className="grid grid-cols-7 items-center border border-dark-muted rounded-lg">
        <div className="col-span-3 flex items-center space-x-2 border-r border-r-dark-muted border-b border-b-dark-muted p-2">
          <Clock className="size-4" />
          <span className="text-sm">Status</span>
        </div>
        <div className="col-span-4 border-b border-b-dark-muted p-2">
          <Badge variant="default" className={getStatusStyle(task.status)}>
            {capitalizeWord(task.status)}
          </Badge>
        </div>

        <div className="col-span-3 flex items-center space-x-2 border-r border-r-dark-muted p-2">
          <Flag className="size-4" />
          <span className="text-sm">Priority</span>
        </div>
        <div className="col-span-4 p-2">
          <Badge variant="default" className={getPrioLevelStyle(task.priority_level)}>
            {capitalizeWord(task.priority_level)}
          </Badge>
        </div>
      </div>
    </div>
  );
}
