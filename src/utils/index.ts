import type { CalendarEvent } from "@/types";
import type {
  ChatMessage,
  IncomingChatMessage,
  MessageHistoryItem,
  PendingChatMessage,
} from "@/types/chat";
import type {
  Task,
  TaskPriority,
  Subtask,
  Category,
  TaskGroups,
} from "@/types/task";

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

export const normalizeHistoryItem = (
  item: MessageHistoryItem
): IncomingChatMessage => {
  return {
    message_id: item.message_id,
    workspace_id: item.workspace_id,
    sender_id: item.sender_id,
    avatar: item.profile_picture,
    nickname: item.nickname,
    type: item.message_type as "text" | "file" | "poll",
    content: item.content,
    reply_to: item.reply_to,
    sent_at: item.sent_at,
  };
};

export function isIncomingChatMessage(
  msg: ChatMessage
): msg is IncomingChatMessage {
  return "message_id" in msg;
}

export function isPendingChatMessage(
  msg: ChatMessage
): msg is PendingChatMessage {
  return "temp_id" in msg;
}

export function isMessageHistoryItem(
  msg: ChatMessage
): msg is MessageHistoryItem {
  return "message_type" in msg;
}

export function formatChatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const isYesterday =
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

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

export const formatDateForAPI = (
  date: Date | string | undefined
): string | undefined => {
  if (!date) return undefined;
  if (typeof date === "string") return date;
  if (date instanceof Date) return date.toISOString().split("T")[0];
  return undefined;
};

export const getCategoryId = (
  name: string,
  categories: Category[]
): number | undefined => {
  const cat = categories.find((category) => category.name === name);

  return cat?.category_id;
};
