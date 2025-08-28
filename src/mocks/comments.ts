import type { Comment } from "@/types/comment";

export const MOCK_COMMENTS: Comment[] = [
  {
    comment_id: 1,
    task_id: 1,
    content:
      "Repository has been created and pushed with the initial README and .gitignore.",
    sender_id: 2,
    sender_name: "Alice Johnson",
    profile_picture: "https://randomuser.me/api/portraits/women/1.jpg",
    created_at: new Date("2025-08-20T09:15:00"),
  },
  {
    comment_id: 2,
    task_id: 1,
    content:
      "I added the MIT license to the repo. Let me know if we should use another license.",
    sender_id: 3,
    sender_name: "Michael Tan",
    profile_picture: "https://randomuser.me/api/portraits/men/2.jpg",
    created_at: new Date("2025-08-20T10:30:00"),
  },
  {
    comment_id: 3,
    task_id: 1,
    content:
      "Configured branch protection rules for main. No direct pushes allowed.",
    sender_id: 4,
    sender_name: "Sofia Reyes",
    profile_picture: "https://randomuser.me/api/portraits/women/3.jpg",
    created_at: new Date("2025-08-20T11:45:00"),
  },
  {
    comment_id: 4,
    task_id: 1,
    content:
      "I also added a CONTRIBUTING.md file so new devs know our workflow.",
    sender_id: 5,
    sender_name: "Daniel Lee",
    profile_picture: "https://randomuser.me/api/portraits/men/4.jpg",
    created_at: new Date("2025-08-20T13:10:00"),
  },
  {
    comment_id: 5,
    task_id: 1,
    content:
      "Everything looks good! Project repo is now ready for feature branches.",
    sender_id: 1,
    sender_name: "Jonel Villaver",
    profile_picture: "https://randomuser.me/api/portraits/men/5.jpg",
    created_at: new Date("2025-08-21T08:00:00"),
  },
];
