import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash } from "lucide-react";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  onDeleteTask: () => void;
  onEditTask: () => void;
  canEdit: boolean;
  canDelete: boolean;
};

export default function TaskMenu({ onDeleteTask, onEditTask, canEdit, canDelete, children }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={onEditTask}
            disabled={!canEdit}
            className={`${!canEdit && "cursor-not-allowed"}`}
            title={!canEdit ? "You don't have permission to edit this task" : ""}
          >
            <Edit />
            <span className="text-sm">Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDeleteTask}
            disabled={!canDelete}
            className={`text-error ${!canDelete && "cursor-not-allowed"}`}
          >
            <Trash className="text-error" />
            <span className="text-sm">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
