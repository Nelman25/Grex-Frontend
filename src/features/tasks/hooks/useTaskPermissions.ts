import { useAuth } from "@/context/auth-context";
import type { WorkspaceMember } from "@/types/member";
import type { Task, TaskAssignee } from "@/types/task";
import { useMemo } from "react";

export function useTaskPermissions(task: Task | undefined, members: WorkspaceMember[], assignees: TaskAssignee[]) {
  const { user } = useAuth();

  const isInvolved = useMemo(
    () => assignees.some((a) => a.user_id === user?.user_id) || task?.created_by === user?.user_id,
    [assignees, user?.user_id, task?.created_by]
  );
  
  const isLeader = useMemo(
    () => members.some((m) => m.user_id === user?.user_id && m.role === "leader"),
    [members, user?.user_id]
  );

  const isCreator = task?.created_by === user?.user_id;

  const canManageAssignees = isLeader || isCreator;
  const canMarkTaskAsDone = (isLeader || isInvolved) && task?.status !== "done";

  return { isLeader, isCreator, isInvolved, canManageAssignees, canMarkTaskAsDone };
}
