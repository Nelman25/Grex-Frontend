import type { NewTask } from "@/types/task";

export const MOCK_TASKS: NewTask[] = [
  {
    title: "Set up project repository",
    subject: "Initialize GitHub repository for Grex",
    description:
      "Create a GitHub repository for the Grex project, set up the main branch, and configure basic repository settings including README, .gitignore, and license.",
    deadline: new Date("2025-08-28"),
    status: "done",
    priority_level: "medium",
    created_by: 1,
  },
  {
    title: "Design Grex UI wireframes",
    subject: "Plan user interface layout",
    description:
      "Use Figma or similar tools to create wireframes for the main pages of Grex: login, dashboard, task board, and settings. Present the design for team review.",
    deadline: new Date("2025-08-30"),
    status: "pending",
    priority_level: "high",
    created_by: 1,
  },
  {
    title: "Build authentication system",
    subject: "Implement login and registration",
    description:
      "Develop a secure authentication system for Grex using JWT and bcrypt. Must include email validation, password encryption, and user session handling.",
    deadline: new Date("2025-09-05"),
    status: "pending",
    priority_level: "high",
    created_by: 1,
  },
  {
    title: "Implement task management module",
    subject: "Core feature of Grex",
    description:
      "Create the task module that allows users to add, edit, delete, and view tasks. Each task should support priority, status, and deadlines.",
    deadline: new Date("2025-09-10"),
    status: "pending",
    priority_level: "high",
    created_by: 1,
  },
  {
    title: "Integrate notifications",
    subject: "Deadline reminders for users",
    description:
      "Add push/email notifications to remind users of upcoming deadlines or overdue tasks. Notifications should be customizable in user settings.",
    deadline: new Date("2025-09-12"),
    status: "pending",
    priority_level: "medium",
    created_by: 1,
  },
  {
    title: "Deploy Grex to production",
    subject: "Make Grex live",
    description:
      "Deploy the Grex application to a cloud service (e.g., Vercel, Netlify, or AWS). Set up a custom domain, SSL certificate, and CI/CD pipeline.",
    deadline: new Date("2025-09-15"),
    status: "pending",
    priority_level: "high",
    created_by: 1,
  },
  {
    title: "Set up CI/CD pipeline",
    subject: "Automate deployment",
    description:
      "Configure GitHub Actions to automatically build, test, and deploy Grex on pushes to the main branch.",
    deadline: new Date("2025-09-03"),
    status: "pending",
    priority_level: "high",
    created_by: 1,
  },
  {
    title: "Design database schema",
    subject: "Database planning",
    description:
      "Create the ERD and define schema for users, tasks, subtasks, and notifications. Review with the team before implementation.",
    deadline: new Date("2025-09-01"),
    status: "pending",
    priority_level: "high",
    created_by: 1,
  },
  {
    title: "Implement user profile management",
    subject: "Account settings",
    description:
      "Allow users to update profile info, change passwords, and upload an avatar. Ensure form validation and security best practices.",
    deadline: new Date("2025-09-06"),
    status: "pending",
    priority_level: "medium",
    created_by: 1,
  },
  {
    title: "Integrate third-party login",
    subject: "OAuth support",
    description:
      "Implement Google and GitHub login options using OAuth 2.0. Store linked accounts in the database.",
    deadline: new Date("2025-09-09"),
    status: "pending",
    priority_level: "medium",
    created_by: 1,
  },
  {
    title: "Implement activity log",
    subject: "Track user actions",
    description:
      "Add an activity log system to record important user and system actions (e.g., task created, task deleted, login attempts).",
    deadline: new Date("2025-09-11"),
    status: "pending",
    priority_level: "low",
    created_by: 1,
  },
  {
    title: "Improve accessibility",
    subject: "A11y compliance",
    description:
      "Ensure Grex meets WCAG accessibility standards. Add ARIA labels, keyboard navigation, and color-contrast checks.",
    deadline: new Date("2025-09-14"),
    status: "pending",
    priority_level: "medium",
    created_by: 1,
  },

  // ✅ Extra tasks for coverage
  {
    title: "Write unit tests for auth module",
    subject: "Testing authentication",
    description:
      "Ensure all authentication functions have at least 80% test coverage using Jest. Include tests for login, logout, registration, and token refresh.",
    deadline: new Date("2025-09-02"),
    status: "done",
    priority_level: "high",
    created_by: 1,
  },
  {
    title: "Fix broken UI styles",
    subject: "Polish frontend",
    description:
      "Resolve CSS issues in the dashboard layout and fix misaligned components. Verify responsiveness across mobile and desktop.",
    deadline: new Date("2025-08-27"),
    status: "overdue",
    priority_level: "medium",
    created_by: 1,
  },
  {
    title: "Update project documentation",
    subject: "Docs for Grex",
    description:
      "Update the README and add contribution guidelines. Ensure setup instructions are clear and working for new contributors.",
    deadline: new Date("2025-08-25"),
    status: "overdue",
    priority_level: "low",
    created_by: 1,
  },
  {
    title: "Conduct team retrospective",
    subject: "Sprint review",
    description:
      "Schedule and run a team retrospective meeting to discuss what went well, what could be improved, and set action items for the next sprint.",
    deadline: new Date("2025-08-29"),
    status: "done",
    priority_level: "low",
    created_by: 1,
  },
  {
    title: "Optimize database queries",
    subject: "Improve performance",
    description:
      "Analyze slow queries in the task module and optimize them for performance. Add indexes where necessary.",
    deadline: new Date("2025-09-08"),
    status: "pending",
    priority_level: "low",
    created_by: 1,
  },
  {
    title: "Refactor state management",
    subject: "Improve frontend architecture",
    description:
      "Replace prop drilling with Zustand or Redux for better state management across the Kanban board.",
    deadline: new Date("2025-09-07"),
    status: "pending",
    priority_level: "medium",
    created_by: 1,
  },
  {
    title: "Testing tasks",
    subject: "Testing subject task",
    description:
      "This is just for testing to see if the tasks are being filtered.",
    deadline: new Date("2025-09-07"),
    status: "pending",
    priority_level: "medium",
    created_by: 1,
  },
];
