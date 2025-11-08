import { z } from "zod";

export const userProfileSchema = z.object({
  user_id: z.number(),
  email: z.email(),
  phone_number: z.string().nullable().optional(),
  first_name: z.string(),
  last_name: z.string(),
  profile_picture: z.string().nullable(),
  role: z.string().nullable(),
  bio: z.string().nullable(),
  skills: z.array(z.string()),
  social_links: z.object({
    github: z.string().nullable().optional(),
    linkedin: z.string().nullable().optional(),
    portfolio: z.string().nullable().optional(),
    twitter: z.string().nullable().optional(),
    discord: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
  }),
});

export type User = z.infer<typeof userProfileSchema>;
