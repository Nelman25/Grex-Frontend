import type { Task, TaskPriority, TaskGroups, Subtask } from "@/types/task";

// MOCK USER IMAGES FOR TESTING
const USER_IMAGES = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/45.jpg",
  "https://randomuser.me/api/portraits/men/67.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg",
  "https://randomuser.me/api/portraits/women/88.jpg",
  "https://randomuser.me/api/portraits/men/23.jpg",
  "https://randomuser.me/api/portraits/women/61.jpg",
  "https://randomuser.me/api/portraits/men/90.jpg",
  "https://randomuser.me/api/portraits/women/7.jpg",
];

export const unslugify = (string: string) => {
  return string.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

export const getInitials = (str: string | undefined) => {
  if (!str) return "";

  const words = str.trim().split(/\s+/);
  const initials = words.slice(0, 2).map((word) => word[0].toUpperCase());

  return initials.join("");
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getTypeColor = (type: string): string => {
  switch (type) {
    case "pending":
      return "bg-info";
    case "done":
      return "bg-success";
    case "overdue":
      return "bg-error";
    default:
      return "";
  }
};

export const groupTasksByStatus = (tasks: Task[]) => {
  return tasks.reduce<TaskGroups>(
    (groups, task) => {
      groups[task.status].push(task);
      return groups;
    },
    {
      pending: [],
      done: [],
      overdue: [],
    }
  );
};

export const getPrioLevelStyle = (priority_level: TaskPriority) => {
  switch (priority_level) {
    case "low":
      return "text-blue-500 bg-blue-500/15";
    case "medium":
      return "text-amber-500 bg-amber-500/15";
    case "high":
      return "text-rose-500 bg-rose-500/15";
    default:
      return "";
  }
};

export const capitalizeWord = (word: string) => {
  if (!word) return "";

  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

export const getProgressPercentage = (subtasks: Subtask[]): number => {
  if (subtasks.length === 0) return 0;

  const length = subtasks.length;
  const noOfDone = subtasks.filter((s) => s.is_done).length;

  return (noOfDone / length) * 100;
};

export const getStatusStyle = (status: string): string => {
  switch (status) {
    case "pending":
      return "text-blue-500 bg-blue-500/15";
    case "done":
      return "text-success bg-success/15";
    case "overdue":
      return "text-error bg-error/15";
    default:
      return "";
  }
};

export const getPriorityBadge = (
  prioLevel: string
): "secondary" | "destructive" | "default" | "outline" => {
  switch (prioLevel) {
    case "low":
      return "default";
    case "medium":
      return "outline";
    case "high":
      return "destructive";
    default:
      return "outline";
  }
};

export const getRandomUserImage = (): string => {
  const randomIndex = Math.floor(Math.random() * USER_IMAGES.length);
  return USER_IMAGES[randomIndex];
};
