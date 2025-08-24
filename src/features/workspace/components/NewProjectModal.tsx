import { Controller, useForm, type SubmitHandler } from "react-hook-form";
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
import { useState, type PropsWithChildren } from "react";
import newProjectHero from "@/assets/NewProjectHero.svg";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/DatePicker";
import type { NewProject } from "@/types/project";
import { useProjectStore } from "@/stores/useProjectStore";
import RHFFormField from "@/components/RHFFormField";

const defaultValues = {
  name: "",
  description: "",
  project_nature: "",
  start_date: undefined,
  due_date: undefined,
};

export function NewProjectModal({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<NewProject>({ defaultValues });

  const { addProject } = useProjectStore();

  const onSubmit: SubmitHandler<NewProject> = (project) => {
    // TODO: add leader_id and send the data to the backend api

    // Add project to the project store to simulate sneding request to backend api
    addProject(project);

    setOpen(false);
    reset();
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[850px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="">
            <DialogTitle className="">Create New Project</DialogTitle>
            <DialogDescription className="">
              Set up your project details below. You can update these anytime
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-8">
            <img
              src={newProjectHero}
              alt="New Project Hero"
              className="size-[400px]"
            />
            <div className="flex flex-col space-y-6">
              <RHFFormField id="name" label="name" error={errors.name?.message}>
                <Input
                  id="name"
                  placeholder="Grex - A Collaboration Platform/Project Management Tool"
                  {...register("name", {
                    required: "Project name is required.",
                  })}
                />
              </RHFFormField>
              <RHFFormField
                id="description"
                label="Description"
                error={errors?.description?.message}
              >
                <Textarea
                  id="description"
                  placeholder="Tell us what your project is about..."
                  {...register("description", {
                    required: "Project description is required.",
                  })}
                />
              </RHFFormField>
              <RHFFormField
                id="project_nature"
                label="Project nature"
                error={errors.project_nature?.message}
              >
                <Input
                  id="project_nature"
                  placeholder="Software Development"
                  {...register("project_nature", {
                    required: "Project nature is required",
                  })}
                />
              </RHFFormField>

              <div className="grid grid-cols-2 gap-3">
                <Controller
                  control={control}
                  name="start_date"
                  rules={{ required: "Start date is required" }}
                  render={({ field }) => (
                    <div>
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
                  name="due_date"
                  rules={{ required: "End date is required" }}
                  render={({ field }) => (
                    <div>
                      <DatePicker
                        label="End date"
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                      />
                      <p className="text-error text-xs">
                        {errors.due_date?.message}
                      </p>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => reset()}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
