// import { create } from "zustand";
// import type { EditTaskPayload, Task } from "@/types/task";
// import { MOCK_TASKS } from "@/mocks/tasks";

// type TaskStore = {
//   tasks: Task[];
//   addTask: (task: Task) => void;
//   editTask: (task: EditTaskPayload) => void;
//   deleteTask: (id: number) => void;
// };

// export const useTaskStore = create<TaskStore>((set, get) => ({
//   tasks: MOCK_TASKS,
//   addTask: (task) => set({ tasks: get().tasks.concat(task) }),
//   editTask: (task) =>
//     set({
//       tasks: get().tasks.map((t) =>
//         t.task_id === task.task_id ? { ...t, ...task } : t
//       ),
//     }),
//   deleteTask: (id) =>
//     set({ tasks: get().tasks.filter((t) => t.task_id !== id) }),
// }));
