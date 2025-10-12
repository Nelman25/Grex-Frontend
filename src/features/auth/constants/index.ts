import { FolderKanban, RefreshCcw, UserRound } from "lucide-react";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import type { IAuthSocial } from "../types/auth";

export const AUTH_SOCIALS: IAuthSocial[] = [
  { provider: "Google", icon: FaGoogle },
  { provider: "Facebook", icon: FaFacebook },
  { provider: "GitHub", icon: FaGithub },
];

export const SIGNUP_TEXTS = [
  {
    title: "Collaborate with anyone",
    description: "Bring your whole team onboard with unlimited members, no extra fees.",
    icon: UserRound,
  },
  {
    title: "Stay on top of projects",
    description: "Get real-time updates, progress tracking, and insights across all your workspaces.",
    icon: FolderKanban,
  },
  {
    title: "Always in sync",
    description: "From tasks to timelines, Grex keeps your team updated in real time so nothing slips through the cracks.",
    icon: RefreshCcw,
  },
];

export const SIGNIN_TEXTS = [
  {
    title: "Reconnect with your team",
    description: "Jump straight into ongoing projects and conversations.",
    icon: UserRound,
  },
  {
    title: "Track your progress",
    description: "See your latest updates, tasks, and deadlines in one place.",
    icon: FolderKanban,
  },
  {
    title: "Stay in the loop",
    description: "Get instant access to real-time changes across all your workspaces.",
    icon: RefreshCcw,
  },
];
