import { create } from "zustand";
import type { Comment } from "@/types/comment";
import { MOCK_COMMENTS } from "@/mocks/comments";

type CommentsStore = {
  comments: Comment[];
  addComment: (comment: Comment) => void;
};

export const useCommentsStore = create<CommentsStore>((set, get) => ({
  comments: MOCK_COMMENTS,
  addComment: (comment) => set({ comments: get().comments.concat(comment) }),
}));
