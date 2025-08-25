import { create } from "zustand";
import type { NewSubtask, Subtask } from "@/types/task";
import { MOCK_SUBTASKS } from "@/mocks/subtasks";

type SubtaskStore = {
  subtasks: Subtask[];
  addSubtask: (subtask: NewSubtask) => void;
  toggleSubtask: (id: number) => void;
};

export const useSubtaskStore = create<SubtaskStore>((set, get) => ({
  subtasks: MOCK_SUBTASKS,

  addSubtask: (subtask) =>
    set(() => {
      const newSubtask: Subtask = {
        ...subtask,
        subtask_id: Math.floor(Math.random() * 999999),
        created_at: new Date(),
      };

      return { subtasks: get().subtasks.concat(newSubtask) };
    }),

  toggleSubtask: (id) =>
    set(() => ({
      subtasks: get().subtasks.map((s) =>
        s.subtask_id === id ? { ...s, is_done: !s.is_done } : s
      ),
    })),
}));
