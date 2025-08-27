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
import { useTaskStore } from "@/stores/useTasksStore";
import TaskMenu from "./TaskMenu";
import EditTask from "./EditTask";

type Props = PropsWithChildren & {
  task: Task;
};

export default function TaskSheet({ children, task }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [newSubtask, setNewSubtask] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [isEditting, setIsEdditing] = useState(false);

  // TODO: CHANGE THIS TO THE ACTUAL DATA FETCHING FOR PROJECT/WORKSPACE AND SUBTASKS
  const projects = useProjectStore((state) => state.projects);
  const project = projects.find((p) => p.workspace_id === task.workspace_id); // DATA OF THE CURRENTLY SELECTED PROJECT
  const subtasks = useSubtaskStore((state) => state.subtasks).filter(
    // SUBTASKS OF THE SELECTED TASK
    (s) => s.task_id === task.task_id
  );
  const addSubtask = useSubtaskStore((state) => state.addSubtask); // REQUEST FOR CREATE SUBTASK
  const deleteTask = useTaskStore((state) => state.deleteTask); // REQUEST FOR DELETE TASK

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

  const handleDeleteTask = () => {
    deleteTask(task.task_id);
    setShowMenu(false);
  };

  const handleEditTask = () => {
    setIsEdditing(true);
    setShowMenu(false);
  };

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        {isEditting && (
          <EditTask task={task} onCancel={() => setIsEdditing(false)} />
        )}
        {!isEditting && (
          <>
            <SheetHeader>
              <div>
                <div className="flex justify-between">
                  <SheetTitle className="text-xl font-bold">
                    {task.title}
                  </SheetTitle>
                  <TaskMenu
                    showMenu={showMenu}
                    onShowMenu={setShowMenu}
                    onDeleteTask={handleDeleteTask}
                    onEditTask={handleEditTask}
                  />
                </div>
                <h3 className="text-dark-subtle text-medium">{task.subject}</h3>
              </div>
              <SheetDescription className="mt-4 w-[90%]">
                {task.description}
              </SheetDescription>

              <TaskMetaSection task={task} project={project} />
            </SheetHeader>
          </>
        )}

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
