import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@radix-ui/react-label";
import { Check } from "lucide-react";
import { useCallback, useState, type PropsWithChildren } from "react";
import { FaRegComments } from "react-icons/fa";
import { GoKebabHorizontal } from "react-icons/go";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { TbSubtask } from "react-icons/tb";
import { TiAttachmentOutline } from "react-icons/ti";
import { useParams } from "react-router";
import { toast } from "sonner";

import noDocuments from "@/assets/noDocuments.svg";
import PageLoader from "@/components/PageLoader";
import { useFetchWorkspaceMembersQuery } from "@/features/workspace/hooks/queries/useFetchWorkspaceMembersQuery";
import { useCreateSubtaskMutation } from "../hooks/mutations/useCreateSubtaskMutation";
import { useDeleteTaskMutation } from "../hooks/mutations/useDeleteTaskMutation";
import { useMarkTaskAsDoneMutation } from "../hooks/mutations/useMarkTaskAsDoneMutation";
import { useFetchSubtasksQuery } from "../hooks/queries/useFetchSubtasksQuery";
import { useFetchTaskAssigneesQuery } from "../hooks/queries/useFetchTaskAssigneesQuery";
import { useTaskPermissions } from "../hooks/useTaskPermissions";

import EditTask from "./EditTask";
import SubtaskList from "./SubtaskList";
import TaskAssignees from "./TaskAssignees";
import TaskComments from "./TaskComments";
import TaskDueDate from "./TaskDueDate";
import TaskMenu from "./TaskMenu";
import TaskPriority from "./TaskPriority";
import TaskStatus from "./TaskStatus";
import type { Task } from "../schemas/task.schema";

type Props = PropsWithChildren & {
  task: Task;
};

export default function TaskSheet({ children, task }: Props) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [newSubtask, setNewSubtask] = useState("");

  const { workspace_id } = useParams();
  const workspaceId = Number(workspace_id);

  const { mutate: deleteTask } = useDeleteTaskMutation(workspaceId);
  const { mutate: createSubtask } = useCreateSubtaskMutation(task.task_id);
  const { mutate: markTaskComplete } = useMarkTaskAsDoneMutation(workspaceId);

  const { data: subtasks = [], isPending: subtasksPending } = useFetchSubtasksQuery(task.task_id);
  const { data: members = [] } = useFetchWorkspaceMembersQuery(workspaceId);
  const { data: assignees = [] } = useFetchTaskAssigneesQuery(task.task_id);

  const { isLeader, isInvolved, isCreator, canManageAssignees, canMarkTaskAsDone } = useTaskPermissions(task, members, assignees);

  const handleDeleteTask = useCallback(() => {
    deleteTask(task.task_id);
  }, [deleteTask, task.task_id]);

  const handleEditTask = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleMarkTaskAsDone = () => {
    if (!canMarkTaskAsDone) return;

    markTaskComplete(task.task_id, {
      onSuccess: () => toast.success("Task marked as done"),
      onError: (error) =>
        toast.error("Failed to mark task as done", {
          description: error.message,
        }),
    });
  };

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;

    createSubtask(
      { description: newSubtask },
      {
        onSuccess: () => toast.success("Subtask added"),
        onError: (err) => toast.error(err.message),
      }
    );

    setNewSubtask("");
    setIsAddingSubtask(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="px-2">
        <div
          className="py-4 px-2 border-b cursor-not-allowed"
          title={!canMarkTaskAsDone ? "You don't have permissions to mark this task as done" : ""}
        >
          <Button
            disabled={!canMarkTaskAsDone}
            onClick={handleMarkTaskAsDone}
            className="flex items-center space-x-2 px-4 py-2 border-t border-t-brand-primary rounded bg-brand-primary hover:bg-brand-dark"
          >
            {task.status === "pending" || task.status === "overdue" ? (
              <>
                <Check />
                <span className="text-light-text">Mark Complete</span>
              </>
            ) : (
              "Completed"
            )}
          </Button>
        </div>

        <div className="h-11 flex justify-between items-center">
          <button onClick={() => setOpen(false)}>
            <MdKeyboardDoubleArrowRight className="size-4 text-muted-foreground" />
          </button>
          <TaskMenu
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            canEdit={isLeader || isCreator}
            canDelete={isLeader || isCreator}
          >
            <div
              role="button"
              className="rounded-sm size-6 bg-dark-surface hover:bg-dark-muted border flex items-center justify-center transition-colors"
            >
              <GoKebabHorizontal className="size-4 text-dark-text/60" />
            </div>
          </TaskMenu>
        </div>

        {isEditing ? (
          <EditTask task={task} onCancel={() => setIsEditing(false)} />
        ) : (
          <>
            <SheetHeader className="-mt-6">
              <SheetTitle className="text-2xl font-bold line-clamp-1">{task.title}</SheetTitle>
              <h3 className="line-clamp-1">{task.subject}</h3>
              <SheetDescription className="w-[90%] line-clamp-3">{task.description}</SheetDescription>
            </SheetHeader>

            <div className="px-6">
              <TaskAssignees id={task.task_id} canManageAssignees={canManageAssignees} />
              <TaskDueDate task={task} />
              <TaskStatus status={task.status} />
              <TaskPriority priorityLevel={task.priority_level} />
            </div>
          </>
        )}

        {subtasksPending && <PageLoader />}

        <Tabs defaultValue="subtasks">
          <TabsList className="w-full justify-start rounded-none bg-transparent border-b border-dark-muted sticky top-0 z-10">
            <TabsTrigger
              value="subtasks"
              className="flex py-4 gap-2 border-none  data-[state=active]:bg-transparent! data-[state=active]:text-brand-primary! data-[state=active]:border-b-brand-primary!"
            >
              <TbSubtask /> Subtasks
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="flex py-4 gap-2 border-none  data-[state=active]:bg-transparent! data-[state=active]:text-brand-primary! data-[state=active]:border-b-brand-primary!"
            >
              <FaRegComments /> Comments
            </TabsTrigger>
            <TabsTrigger
              value="attachments"
              className="flex py-4 gap-2 border-none  data-[state=active]:bg-transparent! data-[state=active]:text-brand-primary! data-[state=active]:border-b-brand-primary!"
            >
              <TiAttachmentOutline /> Attachments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subtasks">
            <div className="flex flex-col space-y-4 px-4">
              <Label>Subtasks</Label>
              <SubtaskList task={task} task_id={task.task_id} subtasks={subtasks} className="flex flex-col space-y-2" />

              {isAddingSubtask && (
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

              <div
                title={!isLeader && !isInvolved ? "You don't have permissions to add subtasks" : ""}
                className={!isLeader && !isInvolved ? "opacity-40 cursor-not-allowed inline-flex" : ""}
              >
                <button
                  className={`max-w-[150px] text-sm text-light-text bg-brand-primary px-4 py-2 rounded shadow ${
                    isAddingSubtask || (!isLeader && !isInvolved) ? "opacity-40 cursor-not-allowed" : "hover:bg-brand-dark"
                  }`}
                  onClick={() => setIsAddingSubtask(!isAddingSubtask)}
                  disabled={isAddingSubtask || (!isLeader && !isCreator)}
                >
                  + Add Subtask
                </button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="h-full">
            <TaskComments taskId={task.task_id} />
          </TabsContent>

          <TabsContent value="attachments">
            <div className="flex flex-col items-center justify-between h-60">
              <img src={noDocuments} alt="no attachments" />
              <h3 className="font-semibold text-lg text-dark-text">No files shared</h3>
              <p className="text-dark-subtle">Files attached to task comments will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
