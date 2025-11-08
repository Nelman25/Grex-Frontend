import api from "@/lib/axios";
import type { WorkspaceMember } from "@/types/member";
import type {
  EditProject,
  NewProject,
  NewQuickLink,
  Project,
  QuickLink,
  RecentActivity,
  WorkspacePayload,
  WorkspaceResponse,
} from "@/types/project";
import { fetchAndValidate } from "@/utils/api";
import { userWorkspacesSchema, type UserWorkspaces } from "../schemas/workspace.schema";

export const createWorkspace = async (workspace: NewProject): Promise<Project> => {
  const payload: WorkspacePayload = {
    ...workspace,
    start_date: workspace.start_date.toISOString().split("T")[0],
    due_date: workspace.due_date.toISOString().split("T")[0],
  };

  const { data } = await api.post<Project>("/workspace", payload);

  return data;
};

export const getWorkspaces = async (user_id: number): Promise<UserWorkspaces> => {
  return fetchAndValidate(`/users/${user_id}/workspace`, userWorkspacesSchema);
};

export const getSelectedWorkspace = async (workspace_id: number): Promise<WorkspaceResponse> => {
  const { data } = await api.get<WorkspaceResponse>(`/workspace/${workspace_id}`);

  return data;
};

export const editWorkspace = async (workspace_id: number, payload: EditProject): Promise<void> => {
  await api.patch(`/workspace/${workspace_id}`, payload);
};

export const getWorkspaceMembers = async (workspace_id: number): Promise<WorkspaceMember[]> => {
  const { data } = await api.get<WorkspaceMember[]>(`/workspace/${workspace_id}/members`);
  return data;
};

export const kickMember = async (workspace_id: number, user_id: number): Promise<void> => {
  await api.delete(`/workspace/${workspace_id}/members?user_id=${user_id}`);
};

export const makeMemberLeader = async (workspace_id: number, user_id: number): Promise<void> => {
  await api.patch(`/workspace/${workspace_id}/members/${user_id}`, { role: "leader" });
};

export const getWorkspaceRecentActivities = async (workspace_id: number): Promise<RecentActivity[]> => {
  const { data } = await api.get<RecentActivity[]>(`/workspaces/${workspace_id}/recent-activities`);
  return data;
};

export const createQuickLink = async (workspace_id: number, payload: NewQuickLink): Promise<void> => {
  await api.post<QuickLink>(`/workspaces/${workspace_id}/quick-links`, payload);
};

export const getWorkspaceQuickLinks = async (workspace_id: number): Promise<QuickLink[]> => {
  const { data } = await api.get<QuickLink[]>(`/workspaces/${workspace_id}/quick-links`);
  return data;
};

export const deleteQuickLink = async (link_id: number): Promise<void> => {
  await api.delete(`/quick-links/${link_id}`);
};
