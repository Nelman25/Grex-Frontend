export interface NewProject {
  name: string;
  description: string;
  project_nature: string;
  start_date: Date;
  due_date: Date;
}

export interface Project extends NewProject {
  leader_id: string;
  workspace_id: number;
  created_at: Date;
}
