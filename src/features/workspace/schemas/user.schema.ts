import { z } from "zod";

export const searchUserSchema = z.object({
  email: z.email(),
  first_name: z.string(),
  last_name: z.string(),
  profile_picture: z.string().nullable(),
  user_id: z.number(),
});

export const searchUsersSchema = z.array(searchUserSchema);
export type SearchUser = z.infer<typeof searchUserSchema>;
