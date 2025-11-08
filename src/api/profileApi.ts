import api from "@/lib/axios";
import { userProfileSchema, type User } from "@/schemas/profile.schema";
import type { EditUser } from "@/types/user";
import { fetchAndValidate } from "@/utils/api";

export const getUserProfile = async (user_id: number): Promise<User> => {
  return fetchAndValidate(`/user/${user_id}/profile`, userProfileSchema);
};
export const editUserProfile = async (user_id: number, payload: EditUser): Promise<void> => {
  await api.patch(`/user/${user_id}/profile`, payload);
};
