import type { Task } from "@/types/task";
import { getTypeColor } from "@/utils";
import { GoPlus } from "react-icons/go";
import { VscKebabVertical } from "react-icons/vsc";
import KanbanTask from "./KanbanTask";

interface Props {
  type: "Pending" | "Done" | "Overdue";
  tasks?: Task[];
}

export default function KanbanColumn({ type, tasks }: Props) {
  // TODO: Better fallback for this
  if (!tasks) {
    return;
  }


  return (
    <div className="w-full max-w-[600px] max-h-[800px] rounded bg-surface-overlay p-6">
      <div className="flex justify-between sticky top-2">
        <div className="flex space-x-3">
          <div className={`h-8 w-2 rounded-full ${getTypeColor(type)}`} />
          <span>{type}</span>
          <div className="size-6 bg-blue-400 rounded text-center font-semibold">
            {tasks.length}
          </div>
        </div>

        <div className="flex space-x-2">
          <button>
            <GoPlus />
          </button>
          <button>
            <VscKebabVertical />
          </button>
        </div>
      </div>

      <div className="max-h-[600px] overflow-y-scroll">
        {tasks.map((task) => (
          <KanbanTask key={task.task_id} task={task} />
        ))}
      </div>
    </div>
  );
}
