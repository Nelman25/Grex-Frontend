import type { Task, TaskPriority } from "@/types/task";

type TaskGroups = {
  pending: Task[];
  done: Task[];
  overdue: Task[];
};

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
    case "Pending":
      return "bg-info";
    case "Done":
      return "bg-success";
    case "Overdue":
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
