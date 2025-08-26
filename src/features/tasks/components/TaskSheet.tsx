import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetContent,
  SheetFooter,
} from "@/components/ui/sheet";
import { useProjectStore } from "@/stores/useProjectStore";
import type { Task } from "@/types/task";
import { useState, type PropsWithChildren } from "react";
import SubtaskList from "./SubtaskList";
import { useSubtaskStore } from "@/stores/useSubtasksStore";
import TaskMetaSection from "./TaskMetaSection";
import { Input } from "@/components/ui/input";
import TaskComments from "./TaskComments";

type Props = PropsWithChildren & {
  task: Task;
};

export default function TaskSheet({ children, task }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [newSubtask, setNewSubtask] = useState("");

  // TODO: CHANGE THIS TO THE ACTUAL DATA FETCHING FOR PROJECT/WORKSPACE AND SUBTASKS
  const projects = useProjectStore((state) => state.projects);
  const project = projects.find((p) => p.workspace_id === task.workspace_id);
  const subtasks = useSubtaskStore((state) => state.subtasks).filter(
    (s) => s.task_id === task.task_id
  );
  const addSubtask = useSubtaskStore((state) => state.addSubtask);

  // CHANGE THIS TO A FUNCTION THAT WILL ACTUALLY SEND THE NEW SUBTASK TO BaCKEND
  const handleAddSubtask = () => {
    addSubtask({
      task_id: task.task_id,
      description: newSubtask,
      is_done: false,
    });

    setIsAdding(false);
    setNewSubtask("");
  };
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div>
            <SheetTitle className="text-xl font-bold">{task.title}</SheetTitle>
            <h3 className="text-dark-subtle text-medium">{task.subject}</h3>
          </div>
          <SheetDescription className="mt-4 w-[90%]">
            {task.description}
          </SheetDescription>
        </SheetHeader>

        <TaskMetaSection task={task} project={project} />

        <div className="flex flex-col space-y-4 px-4">
          <Label>Subtasks</Label>
          <SubtaskList
            subtasks={subtasks}
            className="flex flex-col space-y-2"
          />

          {isAdding && (
            <Input
              className="w-2/3 mx-4"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSubtask();
                }
              }}
            />
          )}
          <button
            className="max-w-[150px] text-medium"
            onClick={() => setIsAdding(!isAdding)}
          >
            + Add Subtask
          </button>
        </div>

        <SheetFooter className="p-0">
          <TaskComments taskId={task.task_id} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
