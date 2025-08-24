import { BsPersonWorkspace } from "react-icons/bs";
import { LuBrainCircuit } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
import { FaTasks, FaComments } from "react-icons/fa";
import { GoTasklist, GoProjectSymlink } from "react-icons/go";
import { CiCalendar, CiMail } from "react-icons/ci";

export const FEATURE_CARDS = [
  {
    title: "Workspace Management",
    description:
      "Create dedicated project spaces with role-based permissions. Leaders and Members work together seamlessly.",
    icon: BsPersonWorkspace,
  },
  {
    title: "Task Management",
    description:
      "Assign tasks, set deadlines, and track progress with automated reminders and filtering capabilities.",
    icon: FaTasks,
  },
  {
    title: "Real-time Communication",
    description:
      "Chat, threaded discussions, file sharing, and mentions keep everyone connected and informed.",
    icon: FaComments,
  },
  {
    title: "@GrexAI Assistant",
    description:
      "Built-in AI helps with task breakdowns, workspace summaries, and smart automation.",
    icon: LuBrainCircuit,
  },
  {
    title: "Progress Analytics",
    description:
      "Visual dashboards show task completion, member activity, and deadline performance.",
    icon: TbReportAnalytics,
  },
];

export const SIDEBAR_ITEMS = [
  { title: "My Projects", url: "", icon: GoProjectSymlink, collapsible: true },
  { title: "My Tasks", url: "", icon: GoTasklist },
  { title: "My Calendar", url: "", icon: CiCalendar },
  { title: "My Inbox", url: "", icon: CiMail },
];
