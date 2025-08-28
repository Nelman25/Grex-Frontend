import type { Subtask } from "@/types/task";
import SubtaskItem from "./Subtask";

type Props = {
  subtasks: Subtask[];
  className?: string;
};

// CHANGE TO GENERAL SUBTASKSLIST COMPONENT FOR REUSABILITY
export default function SubtaskList({ subtasks, className }: Props) {
  return (
    <ul className={className}>
      {subtasks.map((subtask) => (
        <SubtaskItem key={subtask.subtask_id} subtask={subtask} />
      ))}
    </ul>
  );
}
