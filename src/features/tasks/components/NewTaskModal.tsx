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
import type { NewTask } from "@/types/task";
import { useState, type PropsWithChildren } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useCreateTaskMutation } from "../hooks/mutations/useCreateTaskMutation";

const defaultValues = {
  title: "",
  subject: "",
  description: "",
  deadline: undefined,
  start_date: undefined,
  priority_level: undefined,
};

type Props = PropsWithChildren & {
  category: string;
};

export default function NewTaskModal({ children, category }: Props) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { workspace_id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<NewTask>({ defaultValues });

  const {
    mutate,
    isPending,
    error: createTaskError,
  } = useCreateTaskMutation(Number(workspace_id));

  if (createTaskError) toast(createTaskError.message);

  const onSubmit: SubmitHandler<NewTask> = (task) => {
    if (!user) throw new Error("No user authenticated"); // Find better solution for this, this is getting repetitive

    mutate({
      ...task,
      created_by: user?.user_id,
      category: category,
    });

    toast(`Task added to ${category}`);
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
                name="start_date"
                rules={{ required: "Start date is required" }}
                render={({ field }) => (
                  <div className="flex-1">
                    <DatePicker
                      label="Start date"
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                    />
                    <p className="text-error text-xs">
                      {errors.start_date?.message}
                    </p>
                  </div>
                )}
              />
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
            </div>
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

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                disabled={isPending}
                onClick={() => reset()}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating Task..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
