export const mockUsers = [
  {
    first_name: "Jonel",
    last_name: "Villaver",
    email: "jonelvillaver@gmail.com",
    password_hash: "Jonelvillaver25*",
  },
  {
    first_name: "Edrich Darren",
    last_name: "Santuyo",
    email: "edrichdarrensantuyo@gmail.com",
    password_hash: "Jonelvillaver25*",
  },
  {
    first_name: "Danfred Martin",
    last_name: "Isip",
    email: "danfredisip@gmail.com",
    password_hash: "Jonelvillaver25*",
  },
  {
    first_name: "Matthew",
    last_name: "Pena",
    email: "matthewpena@gmail.com",
    password_hash: "Jonelvillaver25*",
  },
];

export const recent_activity = [
  {
    type: "task_completed",
    taskId: 567,
    description: "Completed Task: Fix login bug",
    timestamp: "2025-09-14T10:30:00Z",
  },
  {
    type: "comment_added",
    taskId: 789,
    description: "Commented on Task: Update homepage UI",
    timestamp: "2025-09-15T16:45:00Z",
  },
  {
    type: "task_created",
    taskId: 901,
    description: "Created Task: Write unit tests for payment module",
    timestamp: "2025-09-15T18:20:00Z",
  },
  {
    type: "profile_updated",
    userId: 123,
    description: "Updated profile picture",
    timestamp: "2025-09-16T09:05:00Z",
  },
  {
    type: "workspace_joined",
    workspaceId: 456,
    description: "Joined Workspace: Frontend Revamp",
    timestamp: "2025-09-16T10:15:00Z",
  },
  {
    type: "task_assigned",
    taskId: 234,
    description: "Assigned to Task: Integrate Firebase Auth",
    timestamp: "2025-09-16T11:00:00Z",
  },
  {
    type: "task_reopened",
    taskId: 111,
    description: "Reopened Task: Optimize image loading",
    timestamp: "2025-09-16T12:45:00Z",
  },
  {
    type: "comment_added",
    taskId: 234,
    description: "Commented on Task: Added clarification on API endpoints",
    timestamp: "2025-09-16T13:10:00Z",
  },
  {
    type: "milestone_completed",
    milestoneId: 678,
    description: "Completed Milestone: Phase 1 Deployment",
    timestamp: "2025-09-16T14:25:00Z",
  },
  {
    type: "task_completed",
    taskId: 222,
    description: "Completed Task: Implement dark mode toggle",
    timestamp: "2025-09-16T15:40:00Z",
  },
];

export const tasks_summary = {
  totalAssigned: 42,
  completed: 35,
  pending: 5,
  overdue: 2,
};
