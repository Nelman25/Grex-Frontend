import PageLoader from "@/components/PageLoader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Task } from "@/types/task";
import { useState, type PropsWithChildren } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useCreateSubtaskMutation } from "../hooks/mutations/useCreateSubtaskMutation";
import { useDeleteTaskMutation } from "../hooks/mutations/useDeleteTaskMutation";
import { useFetchSubtasksQuery } from "../hooks/queries/useFetchSubtasksQuery";
import EditTask from "./EditTask";
import SubtaskList from "./SubtaskList";
import TaskComments from "./TaskComments";
import TaskMenu from "./TaskMenu";
import TaskMetaSection from "./TaskMetaSection";
import EditTaskAssignees from "./EditTaskAssignees";

type Props = PropsWithChildren & {
  task: Task;
};

export default function TaskSheet({ children, task }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [newSubtask, setNewSubtask] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [isEditting, setIsEdditing] = useState(false);

  const { workspace_id } = useParams();

  const { mutate: deleteTask } = useDeleteTaskMutation(Number(workspace_id));
  const { mutate } = useCreateSubtaskMutation(task.task_id);
  const {
    data: subtasks,
    isPending,
    error,
  } = useFetchSubtasksQuery(task.task_id);

  const handleAddSubtask = () => {
    mutate({ description: newSubtask });
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

  if (error) toast(error.message);

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        {isEditting && (
          <div className="pt-4">
            <EditTask task={task} onCancel={() => setIsEdditing(false)} />
            <div className="p-4">
              <EditTaskAssignees id={task.task_id} />
            </div>
          </div>
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

              <TaskMetaSection task={task} />
            </SheetHeader>
          </>
        )}

        {isPending && <PageLoader />}
        {subtasks && (
          <div className="flex flex-col space-y-4 px-4">
            <Label>Subtasks</Label>
            <SubtaskList
              task_id={task.task_id}
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
        )}

        <SheetFooter className="p-0">
          <TaskComments taskId={task.task_id} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
