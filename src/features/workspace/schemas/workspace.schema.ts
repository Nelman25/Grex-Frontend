import { z } from "zod";

// for getting all the workspaces of the user
export const userWorkspaceSchema = z.object({
  workspace_id: z.number(),
  name: z.string(),
  project_nature: z.string(),
  start_date: z.string(),
  due_date: z.string(),
  created_by: z.number(),
  workspace_profile_url: z.string().nullable(),
  members: z.array(
    z.object({
      user_id: z.number(),
      profile_picture: z.string().nullable(),
    })
  ),
});

export const userWorkspacesSchema = z.array(userWorkspaceSchema);
export type UserWorkspaces = z.infer<typeof userWorkspacesSchema>;

// for getting a specific workspace
export const workspaceSchema = z.object({
  workspace_id: z.number(),
  name: z.string(),
  project_nature: z.string(),
  description: z.string(),
  start_date: z.string(),
  due_date: z.string(),
  workspace_profile_url: z.string().nullable(),
  created_by: z.number(),
  created_at: z.string(),
});

export type Workspace = z.infer<typeof workspaceSchema>;
