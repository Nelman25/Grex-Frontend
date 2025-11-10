import type { JSX } from "react";

export interface SocialLinks {
  github: string | null | undefined;
  linkedin: string | null | undefined;
  portfolio: string | null | undefined;
  twitter: string | null | undefined;
  discord: string | null | undefined;
  email: string | null | undefined;
}

export interface Workspace {
  workspaceId: string;
  name: string;
  role: string;
  joinedAt: string;
}

export interface TaskSummary {
  totalAssigned: number;
  completed: number;
  pending: number;
  overdue: number;
}

export interface Activity {
  type: "task_completed" | "comment_added";
  taskId: string;
  description: string;
  timestamp: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
}

export interface EditUser {
  email?: string;
  phone_number?: string | undefined;
  first_name?: string;
  last_name?: string;
  profile_picture?: string | null;
  role?: string | null;
  bio?: string | null;
  skills?: string[];
  social_links?: SocialLinks;
}

export interface User {
  user_id: number;
  email: string;
  phone_number?: string;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
  role: string | null;
  bio: string | null;
  skills: string[];
  social_links: SocialLinks;
}

type BaseSocialLink = {
  icon: JSX.Element;
  title: string;
};

type UrlSocialLink = BaseSocialLink & {
  type?: undefined;
  url: string | undefined;
  value?: undefined;
};

export type SocialLink = UrlSocialLink;
