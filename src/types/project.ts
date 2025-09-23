export interface NewProject {
  name: string;
  description: string;
  project_nature: string;
  start_date: Date;
  due_date: Date;
  created_by: number;
}

export interface WorkspacePayload {
  name: string;
  description: string;
  project_nature: string;
  start_date: string;
  due_date: string;
  created_by: number; // from leader_id -> created_by - backend team
}

export interface Project extends NewProject {
  workspace_id: number;
  created_at: Date;
  workspace_profile_url: string | null;
}

export interface EditProject {
  name?: string;
  description?: string;
  project_nature?: string;
  start_date?: string;
  due_date?: string;
  workspace_profile_url?: string | null;
}
// SHAPE OF GET ALL WORKSPACES OF USER RESPONSE
export interface UserWorkspacesResponse {
  workspace_id: number;
  name: string;
  project_nature: string;
  start_date: string;
  due_date: string;
  created_by: number;
  workspace_profile_url: string | null;
  members: {
    user_id: number;
    profile_picture: string | null;
    status: string | null;
  }[];
}

// get pecific, complete workspace
export interface WorkspaceResponse {
  workspace_id: number;
  name: string;
  project_nature: string;
  description: string;
  start_date: string;
  due_date: string;
  workspace_profile_url: string | null;
  created_by: number;
  created_at: Date;
}

export interface RecentActivity {
  activity_id: number;
  task_log_id: number;
  workspace_id: number;
  content: string;
  created_at: Date;
}

export interface NewQuickLink {
  link_name: string;
  link_url: string;
}

export interface QuickLink extends NewQuickLink {
  link_id: number;
  workspace_id: number;
  created_at: Date;
}
