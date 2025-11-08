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

// for getting workspace members
// workspace member shape
export const workspaceMemberSchema = z.object({
  user_id: z.number(),
  role: z.enum(["leader", "member"]),
  nickname: z.string(),
  joined_at: z.string(),
  added_by: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.email(),
  profile_picture: z.string().nullable(),
});

export const workspaceMembersSchema = z.array(workspaceMemberSchema); // members array schema

export type WorkspaceMember = z.infer<typeof workspaceMemberSchema>; // for single member
export type WorkspaceMemberArray = z.infer<typeof workspaceMembersSchema>; // for array of members

// for getting workspace recent activities
export const workspaceRecentActivitySchema = z.object({
  activity_id: z.number(),
  task_log_id: z.number().nullable(),
  workspace_id: z.number(),
  content: z.string(),
  created_at: z.string(),
});
export const workspaceRecentActivitiesSchema = z.array(workspaceRecentActivitySchema);
export type WorkspaceRecentActivity = z.infer<typeof workspaceRecentActivitySchema>;

// for getting workspace quick links
export const quickLinkSchema = z.object({
  link_id: z.number(),
  workspace_id: z.number(),
  created_at: z.string(),
  link_name: z.string(),
  link_url: z.string(),
});

export const quickLinkArraySchema = z.array(quickLinkSchema);
export type QuickLink = z.infer<typeof quickLinkSchema>;
