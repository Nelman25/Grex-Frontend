import type { NewSubtask } from "@/types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createSubtask } from "../../api/subtaskApi";

export const useCreateSubtaskMutation = (task_id: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, NewSubtask>({
    mutationFn: ({ description }) => createSubtask(task_id, description),
    onSuccess: () => {
      toast.success("Subtask added");
      queryClient.invalidateQueries({ queryKey: ["subtasks", { task_id }] });
    },
    onError: (error) => {
      toast.error("Failed to create subtask: " + error.message);
      console.error("Failed to create subtask: ", error.message);
    },
  });
};
