import type { CalendarEvent } from "@/types";
import type { ChatMessage, IncomingChatMessage, MessageHistoryItem, PendingChatMessage } from "@/types/chat";
import type { Task, TaskPriority, Subtask, Category, TaskGroups, TaskAssignee, UserTask } from "@/types/task";
import type { User } from "@/types/user";

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

export const formatDateToLong = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString("en-US", {
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

export const groupTasksByCategory = (tasks: Task[], categories: Category[]) => {
  const groups: TaskGroups = categories.reduce((acc, cat) => {
    acc[cat.name] = [];
    return acc;
  }, {} as TaskGroups);

  for (const task of tasks) {
    if (groups[task.category]) {
      groups[task.category].push(task);
    } else {
      groups[task.category] = [task];
    }
  }

  return groups;
};

export const getPrioLevelStyle = (priority_level: TaskPriority) => {
  switch (priority_level) {
    case "low":
      return "text-blue-500 bg-blue-500/15 border border-blue-500/30";
    case "medium":
      return "text-amber-500 bg-amber-500/15 border border-amber-500/30";
    case "high":
      return "text-rose-500 bg-rose-500/15 border border-rose-500/30";
    default:
      return "";
  }
};

export const capitalizeWord = (word: string) => {
  if (!word) return "";

  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

// TODO: When progress === 100, trigger a function that will update the task:
// mark_done_at, and status => "done"
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

export const getPriorityBadge = (prioLevel: string): "secondary" | "destructive" | "default" | "outline" => {
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

export const mapTasksToEvents = (tasks: Task[]): CalendarEvent[] => {
  return tasks.map((task) => {
    const start = new Date(task.start_date).toISOString().split("T")[0];
    const end = new Date(task.deadline).toISOString().split("T")[0];

    return {
      id: task.task_id,
      title: task.title,
      start,
      end,
      description: task.description,
    };
  });
};

// export const normalizeHistoryItem = (item: MessageHistoryItem): IncomingChatMessage => {
//   return {
//     message_id: item.message_id,
//     workspace_id: item.workspace_id,
//     sender_id: item.sender_id,
//     avatar: item.profile_picture,
//     nickname: item.nickname,
//     type: item.message_type as "text" | "file" | "poll",
//     content: item.content,
//     reply_to: item.reply_to,
//     sent_at: item.sent_at,
//   };
// };

export function isIncomingChatMessage(msg: ChatMessage): msg is IncomingChatMessage {
  return "message_id" in msg;
}

export function isPendingChatMessage(msg: ChatMessage): msg is PendingChatMessage {
  return "temp_id" in msg;
}

export function isMessageHistoryItem(msg: ChatMessage): msg is MessageHistoryItem {
  return "is_pinned" in msg;
}

export const timeAgo = (input: Date | string): string => {
  const date = input instanceof Date ? input : new Date(input);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (diffMs < 0) {
    const diffSec = Math.floor(Math.abs(diffMs) / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return `in ${diffSec} sec${diffSec !== 1 ? "s" : ""}`;
    if (diffMin < 60) return `in ${diffMin} min${diffMin !== 1 ? "s" : ""}`;
    if (diffHour < 24) return `in ${diffHour} hour${diffHour !== 1 ? "s" : ""}`;
    return `in ${diffDay} day${diffDay !== 1 ? "s" : ""}`;
  }

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return `${diffSec} sec${diffSec !== 1 ? "s" : ""} ago`;
  if (diffMin < 60) return `${diffMin} min${diffMin !== 1 ? "s" : ""} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour !== 1 ? "s" : ""} ago`;
  return `${diffDay} day${diffDay !== 1 ? "s" : ""} ago`;
};

export function formatChatDate(dateString: string | Date): string {
  const date = new Date(dateString);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

  const isYesterday =
    date.getDate() === now.getDate() - 1 && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  if (isToday) {
    return date.toLocaleTimeString(undefined, options);
  }

  if (isYesterday) {
    return `Yesterday at ${date.toLocaleTimeString(undefined, options)}`;
  }

  if (date.getFullYear() === now.getFullYear()) {
    return (
      date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }) + ` at ${date.toLocaleTimeString(undefined, options)}`
    );
  }

  return (
    date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) + ` at ${date.toLocaleTimeString(undefined, options)}`
  );
}

export const formatDateForAPI = (date: Date | string | undefined): string | undefined => {
  if (!date) return undefined;
  if (typeof date === "string") return date;
  if (date instanceof Date) return date.toISOString().split("T")[0];
  return undefined;
};

export const getCategoryId = (name: string, categories: Category[]): number | undefined => {
  const cat = categories.find((category) => category.name === name);

  return cat?.category_id;
};

export const parseLocalDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const extractTaskId = (content: string): number | null => {
  const match = content.match(/Task\s+(\d+)/);
  return match ? Number(match[1]) : null;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);

  return `${size.toFixed(1)}${units[i].toLowerCase()}`;
};

export const getFullName = (user: User): string => {
  return `${user.first_name} ${user.last_name}`.trim();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getObjectDiff = <T extends Record<string, any>>(original: T, updated: T): Partial<T> => {
  const changes: Partial<T> = {};

  const allKeys = new Set([...Object.keys(original), ...Object.keys(updated)]) as Set<keyof T>;

  allKeys.forEach((key) => {
    const originalValue = original[key];
    const updatedValue = updated[key];

    if (!(key in original)) {
      changes[key] = updatedValue;
      return;
    }

    if (!(key in updated)) {
      return;
    }

    if (Array.isArray(originalValue) && Array.isArray(updatedValue)) {
      if (JSON.stringify(originalValue) !== JSON.stringify(updatedValue)) {
        changes[key] = updatedValue;
      }
    } else if (
      typeof originalValue === "object" &&
      typeof updatedValue === "object" &&
      originalValue !== null &&
      updatedValue !== null &&
      !Array.isArray(originalValue) &&
      !Array.isArray(updatedValue)
    ) {
      const nestedChanges = getObjectDiff(originalValue, updatedValue);
      if (Object.keys(nestedChanges).length > 0) {
        changes[key] = nestedChanges as T[keyof T];
      }
    } else if (originalValue !== updatedValue) {
      changes[key] = updatedValue;
    }
  });

  return changes;
};

export const getTaskSummary = (tasks: Task[] | UserTask[]): [number, number, number] => {
  let pending = 0;
  let done = 0;
  let overdue = 0;

  for (const task of tasks) {
    if (task.status === "done") done++;
    else if (task.status === "pending") pending++;
    else if (task.status === "overdue") overdue++;
  }

  return [done, pending, overdue];
};

export const getTaskPrioritySummary = (tasks: Task[]): [number, number, number] => {
  let low = 0;
  let medium = 0;
  let high = 0;

  for (const task of tasks) {
    if (task.priority_level === "low") low++;
    else if (task.priority_level === "medium") medium++;
    else if (task.priority_level === "high") high++;
  }

  return [low, medium, high];
};

export const aggregateAssignees = (assignees: TaskAssignee[]) => {
  const map: Record<number, { name: string; avatar: string; count: number }> = {};

  for (const a of assignees) {
    if (!map[a.user_id]) {
      map[a.user_id] = { name: a.name, avatar: a.avatar, count: 0 };
    }
    map[a.user_id].count++;
  }

  return Object.values(map);
};

export function getCompletedTasksByDay(tasks: UserTask[]) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const counts = Array(7).fill(0);

  tasks.forEach((task) => {
    if (task.status === "done") {
      const dayIndex = new Date(task.deadline).getDay(); // 0 = Sun, 6 = Sat
      counts[dayIndex] += 1;
    }
  });

  // Return in Mon-Sun order
  const orderedDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return orderedDays.map((day) => ({
    day,
    completed: counts[days.indexOf(day)],
  }));
}
export const getFileExtension = (filename: string) => {
  return filename.split(".").pop()?.toUpperCase() || "FILE";
};
