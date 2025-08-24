import { create } from "zustand";
import type { Task } from "@/types/task";
import { MOCK_TASKS } from "@/mocks/tasks";

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: MOCK_TASKS,
  addTask: (task) => set({ tasks: get().tasks.concat(task) }),
}));
