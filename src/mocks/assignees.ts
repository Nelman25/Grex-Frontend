import { getRandomUserImage } from "@/utils";
import type { TaskAssignee } from "@/types/task";

export const MOCK_TASK_ASSIGNEES: TaskAssignee[] = [
  // Task 1
  { task_id: 1, user_id: 1, avatar: getRandomUserImage(), name: "Jonel Villaver" },
  { task_id: 1, user_id: 2, avatar: getRandomUserImage(), name: "Mika Tan" },
  { task_id: 1, user_id: 3, avatar: getRandomUserImage(), name: "Jay Santos" },

  // Task 2
  { task_id: 2, user_id: 2, avatar: getRandomUserImage(), name: "Mika Tan" },
  { task_id: 2, user_id: 4, avatar: getRandomUserImage(), name: "Anne Cruz" },
  { task_id: 2, user_id: 5, avatar: getRandomUserImage(), name: "Ralph Garcia" },

  // Task 3
  { task_id: 3, user_id: 1, avatar: getRandomUserImage(), name: "Jonel Villaver" },
  { task_id: 3, user_id: 6, avatar: getRandomUserImage(), name: "Kaye Lopez" },
  { task_id: 3, user_id: 3, avatar: getRandomUserImage(), name: "Jay Santos" },

  // Task 4
  { task_id: 4, user_id: 4, avatar: getRandomUserImage(), name: "Anne Cruz" },
  { task_id: 4, user_id: 2, avatar: getRandomUserImage(), name: "Mika Tan" },
  { task_id: 4, user_id: 6, avatar: getRandomUserImage(), name: "Kaye Lopez" },

  // Task 5
  { task_id: 5, user_id: 1, avatar: getRandomUserImage(), name: "Jonel Villaver" },
  { task_id: 5, user_id: 5, avatar: getRandomUserImage(), name: "Ralph Garcia" },
  { task_id: 5, user_id: 3, avatar: getRandomUserImage(), name: "Jay Santos" },

  // Task 6
  { task_id: 6, user_id: 6, avatar: getRandomUserImage(), name: "Kaye Lopez" },
  { task_id: 6, user_id: 2, avatar: getRandomUserImage(), name: "Mika Tan" },
  { task_id: 6, user_id: 4, avatar: getRandomUserImage(), name: "Anne Cruz" },

  // Task 7
  { task_id: 7, user_id: 3, avatar: getRandomUserImage(), name: "Jay Santos" },
  { task_id: 7, user_id: 1, avatar: getRandomUserImage(), name: "Jonel Villaver" },
  { task_id: 7, user_id: 6, avatar: getRandomUserImage(), name: "Kaye Lopez" },

  // Task 8
  { task_id: 8, user_id: 4, avatar: getRandomUserImage(), name: "Anne Cruz" },
  { task_id: 8, user_id: 5, avatar: getRandomUserImage(), name: "Ralph Garcia" },
  { task_id: 8, user_id: 2, avatar: getRandomUserImage(), name: "Mika Tan" },

  // Task 9
  { task_id: 9, user_id: 1, avatar: getRandomUserImage(), name: "Jonel Villaver" },
  { task_id: 9, user_id: 3, avatar: getRandomUserImage(), name: "Jay Santos" },
  { task_id: 9, user_id: 6, avatar: getRandomUserImage(), name: "Kaye Lopez" },

  // Task 10
  { task_id: 10, user_id: 2, avatar: getRandomUserImage(), name: "Mika Tan" },
  { task_id: 10, user_id: 4, avatar: getRandomUserImage(), name: "Anne Cruz" },
  { task_id: 10, user_id: 5, avatar: getRandomUserImage(), name: "Ralph Garcia" },

  // Task 11
  { task_id: 11, user_id: 3, avatar: getRandomUserImage(), name: "Jay Santos" },
  { task_id: 11, user_id: 1, avatar: getRandomUserImage(), name: "Jonel Villaver" },
  { task_id: 11, user_id: 6, avatar: getRandomUserImage(), name: "Kaye Lopez" },

  // Task 12
  { task_id: 12, user_id: 4, avatar: getRandomUserImage(), name: "Anne Cruz" },
  { task_id: 12, user_id: 2, avatar: getRandomUserImage(), name: "Mika Tan" },
  { task_id: 12, user_id: 5, avatar: getRandomUserImage(), name: "Ralph Garcia" },

  // Task 13
  { task_id: 13, user_id: 6, avatar: getRandomUserImage(), name: "Kaye Lopez" },
  { task_id: 13, user_id: 3, avatar: getRandomUserImage(), name: "Jay Santos" },
  { task_id: 13, user_id: 1, avatar: getRandomUserImage(), name: "Jonel Villaver" },

  // Task 14
  { task_id: 14, user_id: 2, avatar: getRandomUserImage(), name: "Mika Tan" },
  { task_id: 14, user_id: 5, avatar: getRandomUserImage(), name: "Ralph Garcia" },
  { task_id: 14, user_id: 4, avatar: getRandomUserImage(), name: "Anne Cruz" },

  // Task 15
  { task_id: 15, user_id: 1, avatar: getRandomUserImage(), name: "Jonel Villaver" },
  { task_id: 15, user_id: 6, avatar: getRandomUserImage(), name: "Kaye Lopez" },
  { task_id: 15, user_id: 3, avatar: getRandomUserImage(), name: "Jay Santos" },

  // Task 16
  { task_id: 16, user_id: 2, avatar: getRandomUserImage(), name: "Mika Tan" },
  { task_id: 16, user_id: 4, avatar: getRandomUserImage(), name: "Anne Cruz" },
  { task_id: 16, user_id: 5, avatar: getRandomUserImage(), name: "Ralph Garcia" },

  // Task 17
  { task_id: 17, user_id: 6, avatar: getRandomUserImage(), name: "Kaye Lopez" },
  { task_id: 17, user_id: 3, avatar: getRandomUserImage(), name: "Jay Santos" },
  { task_id: 17, user_id: 1, avatar: getRandomUserImage(), name: "Jonel Villaver" },

  // Task 18
  { task_id: 18, user_id: 4, avatar: getRandomUserImage(), name: "Anne Cruz" },
  { task_id: 18, user_id: 2, avatar: getRandomUserImage(), name: "Mika Tan" },
  { task_id: 18, user_id: 5, avatar: getRandomUserImage(), name: "Ralph Garcia" }
];
