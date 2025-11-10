import { useFetchWorkspaceMembersQuery } from "@/features/workspace/hooks/queries/useFetchWorkspaceMembersQuery";
import { useParams } from "react-router";
import { useFetchTaskAssigneesQuery } from "../hooks/queries/useFetchTaskAssigneesQuery";
import { useTaskPermissions } from "../hooks/useTaskPermissions";
import type { Subtask } from "../schemas/subtask.schema";
import type { Task } from "../schemas/task.schema";
import SubtaskItem from "./Subtask";

type Props = {
  task: Task;
  subtasks: Subtask[];
  task_id: number;
  className?: string;
};

export default function SubtaskList({ task, task_id, subtasks, className }: Props) {
  const { workspace_id } = useParams();

  const { data: members = [] } = useFetchWorkspaceMembersQuery(Number(workspace_id));
  const { data: assignees = [] } = useFetchTaskAssigneesQuery(task_id);

  const { isLeader, isInvolved, isCreator } = useTaskPermissions(task, members, assignees);

  return (
    <ul className={className}>
      {subtasks?.map((subtask) => (
        <SubtaskItem
          key={subtask.subtask_id}
          task_id={task_id}
          subtask={subtask}
          isLeader={isLeader}
          isInvolved={isInvolved}
          isCreator={isCreator}
        />
      ))}
    </ul>
  );
}
