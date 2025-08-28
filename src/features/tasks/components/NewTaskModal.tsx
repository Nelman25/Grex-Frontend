import { DatePicker } from "@/components/DatePicker";
import RHFFormField from "@/components/RHFFormField";
import SelectComponent from "@/components/SelectComponent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth-context";
import { useTaskStore } from "@/stores/useTasksStore";
import type { NewTask, Task } from "@/types/task";
import { useState, type PropsWithChildren } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { useParams } from "react-router";

const defaultValues = {
  title: "",
  subject: "",
  description: "",
  deadline: undefined,
  priority_level: undefined,
};

export default function NewTaskModal({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);
  const { user } = useAuth();
  const { workspace_id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<NewTask>({ defaultValues });

  // if (!user) throw new Error("No user authenticated.");

  const onSubmit: SubmitHandler<NewTask> = (task) => {
    // TODO: DELETE ALL THE TEMP FIELD WHEN THE API IS READY
    // send the task to the actual endpoint

    const newTask: Task = {
      ...task,
      status: "pending",
      created_by: user?.user_id ?? 1, //
      task_id: Math.random(), // temp
      created_at: new Date(), // temp
      marked_done_at: null, // temp
      workspace_id: Number(workspace_id),
    };

    addTask(newTask);
    setOpen(false);
    reset();
  };
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create a Task</DialogTitle>
          {/* TODO: come up with better description later */}
          <DialogDescription>
            Add a new task by providing its title, description, and other
            details. Newly created tasks will automatically be set to Pending.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4 mt-4 mb-8">
            <RHFFormField
              id="title"
              label="Task name"
              error={errors.title?.message}
            >
              <Input
                id="title"
                placeholder="Task name"
                {...register("title", { required: "Task name is required" })}
              />
            </RHFFormField>
            <RHFFormField
              id="subject"
              label="Subject"
              error={errors.subject?.message}
            >
              <Input
                id="subject"
                placeholder="Subject of the task" // improve this
                {...register("subject", {
                  required: "Task subject is required",
                })}
              />
            </RHFFormField>
            <RHFFormField
              id="description"
              label="Description"
              error={errors.description?.message}
            >
              <Textarea
                id="description"
                placeholder="Description"
                {...register("description", {
                  required: "Description is required",
                })}
              />
            </RHFFormField>

            <div className="flex justify-between">
              <Controller
                control={control}
                name="deadline"
                rules={{ required: "Deadline is required" }}
                render={({ field }) => (
                  <div className="flex-1">
                    <DatePicker
                      label="Deadline"
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                    />
                    <p className="text-error text-xs">
                      {errors.deadline?.message}
                    </p>
                  </div>
                )}
              />
              <Controller
                control={control}
                name="priority_level"
                rules={{ required: "Priority level is required" }}
                render={({ field }) => (
                  <div className="flex-1">
                    <SelectComponent
                      label="Priority level"
                      value={field.value}
                      values={["low", "medium", "high"]}
                      placeholder="Priority level"
                      onChange={(val) => field.onChange(val)}
                    />
                    <p className="text-error text-xs">
                      {errors.priority_level?.message}
                    </p>
                  </div>
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => reset()}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
