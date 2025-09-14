import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import RHFFormField from "@/components/RHFFormField";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import type { EditProject } from "@/types/project";

export default function WorkspaceInfoEdit({
  defaultValues,
  onSave,
  onCancel,
}: {
  defaultValues: EditProject;
  onSave: (data: EditProject) => void;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProject>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      <RHFFormField id="name" label="Workspace Name" error={errors.name?.message}>
        <Input id="name" {...register("name", { required: "Workspace name is required" })} />
      </RHFFormField>
      <RHFFormField id="description" label="Description" error={errors.description?.message}>
        <Textarea id="description" {...register("description", { required: "Description is required" })} />
      </RHFFormField>
      <RHFFormField id="project_nature" label="Project Nature" error={errors.project_nature?.message}>
        <Input id="project_nature" {...register("project_nature", { required: "Project nature is required" })} />
      </RHFFormField>
      <div className="flex gap-4">
        <RHFFormField id="start_date" label="Start Date" error={errors.start_date?.message}>
          <Input id="start_date" type="date" {...register("start_date", { required: "Start date is required" })} />
        </RHFFormField>
        <RHFFormField id="due_date" label="End Date" error={errors.due_date?.message}>
          <Input id="due_date" type="date" {...register("due_date", { required: "End date is required" })} />
        </RHFFormField>
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
