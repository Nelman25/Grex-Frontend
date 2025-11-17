import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../../api/taskApi";
import { toast } from "sonner";

export const useDeleteTaskMutation = (workspace_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task_id: number) => deleteTask(workspace_id, task_id),
    onSuccess: () => {
      toast.success("Task deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks", { workspace_id }] });
    },
    onError: (error) => {
      toast.error(`Error deleting task: ${(error as Error).message}`);
    },
  });
};
