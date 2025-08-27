import { Edit, MoreVertical, Trash } from "lucide-react";

type Props = {
  showMenu: boolean;
  onShowMenu: (show: boolean) => void;
  onDeleteTask: () => void;
  onEditTask: () => void;
};

export default function TaskMenu({
  showMenu,
  onShowMenu,
  onDeleteTask,
  onEditTask,
}: Props) {
  return (
    <div className="relative">
      <button
        onClick={() => onShowMenu(!showMenu)}
        className="p-1 rounded-full hover:bg-gray-800/50"
      >
        <MoreVertical size={18} className="text-gray-500" />
      </button>

      {showMenu && (
        <div className="absolute right-0 z-20 mt-1 bg-dark-surface rounded p-2 shadow-lg animate-fadeIn">
          <button
            className="flex items-center mb-2 space-x-2  min-w-[70px]"
            onClick={onDeleteTask}
          >
            <Trash className="size-4" />
            <span className="text-sm">Delete</span>
          </button>
          <button
            className="flex items-center space-x-2  min-w-[70px]"
            onClick={onEditTask}
          >
            <Edit className="size-4" />
            <span className="text-sm">Edit</span>
          </button>
        </div>
      )}
    </div>
  );
}
