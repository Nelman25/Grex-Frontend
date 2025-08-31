import SubtaskItem from "./Subtask";
import type { Subtask } from "@/types/task";

type Props = {
  subtasks: Subtask[];
  task_id: number;
  className?: string;
};

export default function SubtaskList({ task_id, subtasks, className }: Props) {
  return (
    <ul className={className}>
      {subtasks?.map((subtask) => (
        <SubtaskItem
          key={subtask.subtask_id}
          task_id={task_id}
          subtask={subtask}
        />
      ))}
    </ul>
  );
}
