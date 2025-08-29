import api from "@/lib/axios";
import type { NewProject, Project, WorkspacePayload } from "@/types/project";

export const createWorkspace = async (
  workspace: NewProject
): Promise<Project> => {
  const payload: WorkspacePayload = {
    ...workspace,
    start_date: workspace.start_date.toISOString().split("T")[0],
    due_date: workspace.due_date.toISOString().split("T")[0],
  };

  const { data } = await api.post<Project>("/workspace", payload);

  return data;
};

export const getWorkspaces = async () => {
  
}
