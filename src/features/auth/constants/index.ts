import { FolderKanban, RefreshCcw, UserRound } from "lucide-react";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

export const FEATURES = [
  {
    main: "Collaborate with anyone",
    sub: "Bring your whole team onboard with unlimited members, no extra fees.",
    icon: UserRound,
  },
  {
    main: "Stay on top of projects",
    sub: "Get real-time updates, progress tracking, and insights across all your workspaces.",
    icon: FolderKanban,
  },
  {
    main: "Always in sync",
    sub: "From tasks to timelines, Grex keeps your team updated in real time so nothing slips through the cracks.",
    icon: RefreshCcw,
  },
];

export const AUTH_SOCIALS = [
  {
    label: "Google",
    icon: FaGoogle,
  },
  {
    label: "Facebook",
    icon: FaFacebook,
  },
  {
    label: "GitHub",
    icon: FaGithub,
  },
];

export const SIGNUP_TEXTS = [
  {
    title: "Collaborate with anyone",
    description:
      "Bring your whole team onboard with unlimited members, no extra fees.",
  },
  {
    title: "Stay on top of projects",
    description:
      "Get real-time updates, progress tracking, and insights across all your workspaces.",
  },
  {
    title: "Always in sync",
    description:
      "From tasks to timelines, Grex keeps your team updated in real time so nothing slips through the cracks.",
  },
];

export const SIGNIN_TEXTS = [
  {
    title: "Reconnect with your team",
    description: "Jump straight into ongoing projects and conversations.",
  },
  {
    title: "Track your progress",
    description: "See your latest updates, tasks, and deadlines in one place.",
  },
  {
    title: "Stay in the loop",
    description:
      "Get instant access to real-time changes across all your workspaces.",
  },
];
