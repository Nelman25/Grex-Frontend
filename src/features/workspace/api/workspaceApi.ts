import api from "@/lib/axios";
import type {
  WorkspaceResponse,
  NewProject,
  Project,
  UserWorkspacesResponse,
  WorkspacePayload,
  EditProject,
} from "@/types/project";

export const createWorkspace = async (workspace: NewProject): Promise<Project> => {
  const payload: WorkspacePayload = {
    ...workspace,
    start_date: workspace.start_date.toISOString().split("T")[0],
    due_date: workspace.due_date.toISOString().split("T")[0],
  };

  const { data } = await api.post<Project>("/workspace", payload);

  return data;
};

// magiging ganito na raw -> /users/{user_id}/workspaces
export const getWorkspaces = async (user_id: number): Promise<UserWorkspacesResponse[]> => {
  const { data } = await api.get<UserWorkspacesResponse[]>(`/workspace/${user_id}`);

  return data;
};

// magiging ganito na raw -> /workspaces/{workspace_id}
export const getSelectedWorkspace = async (workspace_id: number, user_id: number): Promise<WorkspaceResponse> => {
  const { data } = await api.get<WorkspaceResponse>(`/workspace/${workspace_id}/${user_id}`);

  return data;
};

export const editWorkspace = async (workspace_id: number, payload: EditProject): Promise<void> => {
  await api.patch(`/workspace/${workspace_id}`, payload);
};

export const kickMember = async (workspace_id: number, user_id: number): Promise<void> => {
  await api.delete(`/workspace/${workspace_id}/members?user_id=${user_id}`);
};

export const makeMemberLeader = async (workspace_id: number, user_id: number): Promise<void> => {
  await api.patch(`/workspace/${workspace_id}/members/${user_id}`, { role: "leader" });
};
