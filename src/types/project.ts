export interface NewProject {
  name: string;
  description: string;
  project_nature: string;
  start_date: Date;
  due_date: Date;
  created_by: number; // from leader_id -> created_by - backend team
}

export interface Project extends NewProject {
  workspace_id: number;
  created_at: Date;
}
