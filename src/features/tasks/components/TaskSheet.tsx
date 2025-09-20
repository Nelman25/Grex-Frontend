import noDocuments from "@/assets/noDocuments.svg";
import PageLoader from "@/components/PageLoader";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Task } from "@/types/task";
import { Label } from "@radix-ui/react-label";
import { useState, type PropsWithChildren } from "react";
import { FaRegComments } from "react-icons/fa";
import { GoKebabHorizontal } from "react-icons/go";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { TbSubtask } from "react-icons/tb";
import { TiAttachmentOutline } from "react-icons/ti";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useCreateSubtaskMutation } from "../hooks/mutations/useCreateSubtaskMutation";
import { useDeleteTaskMutation } from "../hooks/mutations/useDeleteTaskMutation";
import { useFetchSubtasksQuery } from "../hooks/queries/useFetchSubtasksQuery";
import EditTask from "./EditTask";
import SubtaskList from "./SubtaskList";
import TaskAssignees from "./TaskAssignees";
import TaskComments from "./TaskComments";
import TaskDueDate from "./TaskDueDate";
import TaskMenu from "./TaskMenu";
import TaskPriority from "./TaskPriority";
import TaskStatus from "./TaskStatus";

type Props = PropsWithChildren & {
  task: Task;
};

export default function TaskSheet({ children, task }: Props) {
  const [open, setOpen] = useState(false);
  const [isEditting, setIsEdditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newSubtask, setNewSubtask] = useState("");

  const { workspace_id } = useParams();

  const { mutate: deleteTask } = useDeleteTaskMutation(Number(workspace_id));
  const { mutate } = useCreateSubtaskMutation(task.task_id);
  const { data: subtasks = [], isPending, error } = useFetchSubtasksQuery(task.task_id);

  const handleAddSubtask = () => {
    mutate({ description: newSubtask });
    setIsAdding(false);
    toast.success("Subtask added");
    setNewSubtask("");
  };

  const handleDeleteTask = () => {
    deleteTask(task.task_id);
  };

  const handleEditTask = () => {
    setIsEdditing(true);
  };

  if (error) toast(error.message);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="px-2">
        <div className="h-11 flex justify-between items-center">
          <button onClick={() => setOpen(false)}>
            <MdKeyboardDoubleArrowRight className="size-4 text-muted-foreground" />
          </button>

          <TaskMenu onDeleteTask={handleDeleteTask} onEditTask={handleEditTask}>
            <div
              role="button"
              className="rounded-sm size-6 bg-dark-surface hover:bg-dark-muted border flex items-center justify-center transition-colors"
            >
              <GoKebabHorizontal className="size-4 text-dark-text/60" />
            </div>
          </TaskMenu>
        </div>

        {isEditting && <EditTask task={task} onCancel={() => setIsEdditing(false)} />}

        {!isEditting && (
          <>
            <SheetHeader className="-mt-6">
              <SheetTitle className="text-2xl font-bold line-clamp-1">{task.title}</SheetTitle>
              <h3 className="line-clamp-1">{task.subject}</h3>
              <SheetDescription className="w-[90%] line-clamp-3">{task.description}</SheetDescription>
            </SheetHeader>

            <div className="px-6">
              <TaskAssignees id={task.task_id} />
              <TaskDueDate task={task} />
              <TaskStatus status={task.status} />
              <TaskPriority priorityLevel={task.priority_level} />
            </div>
          </>
        )}

        {isPending && <PageLoader />}

        <Tabs defaultValue="subtasks" className="">
          <TabsList className="w-full justify-start rounded-none bg-transparent border-b border-dark-muted sticky top-0 z-10">
            <TabsTrigger
              value="subtasks"
              className="flex py-4 rounded-none gap-2 data-[state=active]:bg-transparent! data-[state=active]:text-brand-primary! border-none border-b data-[state=active]:border-b-brand-primary!"
            >
              <TbSubtask />
              Subtasks
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="flex py-4 rounded-none gap-2 data-[state=active]:bg-transparent! data-[state=active]:text-brand-primary! border-none border-b data-[state=active]:border-b-brand-primary!"
            >
              <FaRegComments />
              Comments
            </TabsTrigger>
            <TabsTrigger
              value="attachments"
              className="flex py-4 rounded-none gap-2 data-[state=active]:bg-transparent! data-[state=active]:text-brand-primary! border-none border-b data-[state=active]:border-b-brand-primary!"
            >
              <TiAttachmentOutline />
              Attachments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subtasks">
            {subtasks && (
              <div className="flex flex-col space-y-4 px-4">
                <Label>Subtasks</Label>
                <SubtaskList task_id={task.task_id} subtasks={subtasks} className="flex flex-col space-y-2" />

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
                <button className="max-w-[150px] text-medium" onClick={() => setIsAdding(!isAdding)}>
                  + Add Subtask
                </button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="comments" className="h-full min-h-[550px] max-h-[600px]">
            <TaskComments taskId={task.task_id} />
          </TabsContent>
          <TabsContent value="attachments">
            {/* No attachment */}
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
