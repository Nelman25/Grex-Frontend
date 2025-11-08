import api from "@/lib/axios";
import type { EditProject, NewProject, NewQuickLink, Project, WorkspacePayload } from "@/types/project";
import { fetchAndValidate } from "@/utils/api";
import {
  type UserWorkspaces,
  type QuickLink,
  type Workspace,
  type WorkspaceMemberArray,
  type WorkspaceRecentActivity,
  quickLinkArraySchema,
  userWorkspacesSchema,
  workspaceMembersSchema,
  workspaceRecentActivitiesSchema,
  workspaceSchema,
} from "../schemas/workspace.schema";

// WORKSPACE GET REQUESTS
export const getWorkspaces = async (user_id: number): Promise<UserWorkspaces> => {
  return fetchAndValidate(`/users/${user_id}/workspace`, userWorkspacesSchema);
};

export const getSelectedWorkspace = async (workspace_id: number): Promise<Workspace> => {
  return fetchAndValidate(`/workspace/${workspace_id}`, workspaceSchema);
};

export const getWorkspaceMembers = async (workspace_id: number): Promise<WorkspaceMemberArray> => {
  return fetchAndValidate(`/workspace/${workspace_id}/members`, workspaceMembersSchema);
};

export const getWorkspaceRecentActivities = async (workspace_id: number): Promise<WorkspaceRecentActivity[]> => {
  return fetchAndValidate(`/workspaces/${workspace_id}/recent-activities`, workspaceRecentActivitiesSchema);
};

export const getWorkspaceQuickLinks = async (workspace_id: number): Promise<QuickLink[]> => {
  return fetchAndValidate(`/workspaces/${workspace_id}/quick-links`, quickLinkArraySchema);
};

export const createWorkspace = async (workspace: NewProject): Promise<Project> => {
  const payload: WorkspacePayload = {
    ...workspace,
    start_date: workspace.start_date.toISOString().split("T")[0],
    due_date: workspace.due_date.toISOString().split("T")[0],
  };

  const { data } = await api.post<Project>("/workspace", payload);

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

export const createQuickLink = async (workspace_id: number, payload: NewQuickLink): Promise<void> => {
  await api.post<QuickLink>(`/workspaces/${workspace_id}/quick-links`, payload);
};

export const deleteQuickLink = async (link_id: number): Promise<void> => {
  await api.delete(`/quick-links/${link_id}`);
};
