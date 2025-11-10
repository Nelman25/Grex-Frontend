import api from "@/lib/axios";
import { userProfileSchema, type EditUser, type User } from "@/schemas/profile.schema";
import { fetchAndValidate } from "@/utils/api/fetchAndValidate";

export const getUserProfile = async (user_id: number): Promise<User> => {
  return fetchAndValidate(`/user/${user_id}/profile`, userProfileSchema);
};
export const editUserProfile = async (user_id: number, payload: EditUser): Promise<void> => {
  await api.patch(`/user/${user_id}/profile`, payload);
};
