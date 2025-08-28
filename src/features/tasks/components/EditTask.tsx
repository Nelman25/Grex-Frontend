import { DatePicker } from "@/components/DatePicker";
import RHFFormField from "@/components/RHFFormField";
import SelectComponent from "@/components/SelectComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTaskStore } from "@/stores/useTasksStore";
import type { EditableTaskFields, Task } from "@/types/task";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import EditTaskAssignees from "./EditTaskAssignees";

type Props = {
  task: Task;
  onCancel: () => void;
};

export default function EditTask({ task, onCancel }: Props) {
  const editTask = useTaskStore((state) => state.editTask);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditableTaskFields>({
    defaultValues: {
      title: task.title,
      subject: task.subject,
      description: task.description,
      deadline: task.deadline,
      priority_level: task.priority_level,
    },
  });
  const onSubmit: SubmitHandler<EditableTaskFields> = (editedTask) => {
    // 'editedTask' is Partial<Task>, here in simulation, the task_id is needed
    // but in actual api connection, we can directly send this 'editedTask' as payload to this
    // endpoint -> /${workspace_id}/${task_id}
    // NOTE: may workspace_id field na si task so no need to get this data from other source
    editTask({ ...editedTask, task_id: task.task_id });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4">
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
                <p className="text-error text-xs">{errors.deadline?.message}</p>
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
                  placeholder={field.value}
                  onChange={(val) => field.onChange(val)}
                />
                <p className="text-error text-xs">
                  {errors.priority_level?.message}
                </p>
              </div>
            )}
          />
        </div>

        <EditTaskAssignees id={task.task_id} />
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}
