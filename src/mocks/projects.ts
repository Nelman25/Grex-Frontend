import type { Project } from "@/types/project";

export const MOCK_PROJECTS: Project[] = [
  {
    name: "Student Attendance System",
    description:
      "A web-based system for tracking student attendance using QR codes. Teachers can generate reports and students can check their attendance history.",
    project_nature: "Web Development / Database",
    start_date: new Date("2025-08-01"),
    due_date: new Date("2025-09-15"),
    created_by: Math.random() * 9999,
    workspace_id: 1,
    created_at: new Date(),
  },
  {
    name: "Library Management App",
    description:
      "A mobile app that allows students to borrow, return, and reserve books digitally. The system also includes overdue notifications.",
    project_nature: "Mobile App Development",
    start_date: new Date("2025-08-10"),
    due_date: new Date("2025-10-01"),
    created_by: Math.random() * 9999,
    workspace_id: 2,
    created_at: new Date(),
  },
  {
    name: "Simple Chat Application",
    description:
      "A real-time chat application built with WebSockets to allow students and professors to communicate during online classes.",
    project_nature: "Software Development / Networking",
    start_date: new Date("2025-08-20"),
    due_date: new Date("2025-10-10"),
    created_by: Math.random() * 9999,
    workspace_id: 3,
    created_at: new Date(),
  },
  {
    name: "Grade Management System",
    description:
      "A system for teachers to encode student grades and automatically compute final averages based on configurable formulas.",
    project_nature: "Web Development / Data Processing",
    start_date: new Date("2025-08-15"),
    due_date: new Date("2025-09-30"),
    created_by: Math.random() * 9999,
    workspace_id: 4,
    created_at: new Date(),
  },
  {
    name: "Campus Navigation App",
    description:
      "A mobile app that helps new students navigate the campus using GPS and building information.",
    project_nature: "Mobile App Development / Maps",
    start_date: new Date("2025-09-01"),
    due_date: new Date("2025-10-20"),
    created_by: Math.random() * 9999,
    workspace_id: 5,
    created_at: new Date(),
  },
  {
    name: "Online Quiz System",
    description:
      "An online platform where instructors can create quizzes, students can answer them in real time, and the system auto-checks results.",
    project_nature: "Web Development / Education Tech",
    start_date: new Date("2025-09-05"),
    due_date: new Date("2025-10-25"),
    created_by: Math.random() * 9999,
    workspace_id: 6,
    created_at: new Date(),
  },
  {
    name: "Grex - A Collaboration Platform",
    description:
      "A team collaboration platform designed to streamline communication and task management. Grex provides Kanban boards, real-time chat, and document sharing to help teams stay aligned and productive.",
    project_nature: "Web Development / Collaboration Tool",
    start_date: new Date("2025-07-21"),
    due_date: new Date("2025-10-15"),
    created_by: Math.random() * 9999,
    workspace_id: 7,
    created_at: new Date(),
  },
];
