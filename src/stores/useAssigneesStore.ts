import { create } from "zustand";
import type { TaskAssignee } from "@/types/task";
import { MOCK_TASK_ASSIGNEES } from "@/mocks/assignees";

type AssigneeStore = {
  assignees: TaskAssignee[];
  addAssignee: (assignee: TaskAssignee) => void;
  removeAssignee: (user_id: number, task_id: number) => void;
};

export const useAssigneeStore = create<AssigneeStore>((set, get) => ({
  assignees: MOCK_TASK_ASSIGNEES,

  addAssignee: (assignee) =>
    set({ assignees: get().assignees.concat(assignee) }),

  removeAssignee: (user_id, task_id) =>
    set({
      assignees: get().assignees.filter(
        (a) => !(a.user_id === user_id && a.task_id === task_id)
      ),
    }),
}));
