import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-context";
import { useFetchUserTasksQuery } from "@/features/tasks/hooks/queries/useFetchUserTasksQuery";
import type { TaskStatus, UserTask } from "@/types/task";
import { formatDate, timeAgo } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, CircleAlert } from "lucide-react";
import { useNavigate } from "react-router";
import slugify from "slugify";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
  hover: {
    y: -2,
    scale: 1.02,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    },
  },
};

const skeletonVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const skeletonItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
    },
  },
};

export default function MyTasks() {
  const { user } = useAuth();
  const { data: tasks = [], isPending } = useFetchUserTasksQuery(user?.user_id);
  const navigate = useNavigate();

  const statusOrder: Record<TaskStatus, number> = {
    overdue: 0,
    pending: 1,
    done: 2,
  };

  const sortTasksByStatus = (tasks: UserTask[]): UserTask[] => {
    return [...tasks].sort((a, b) => {
      return statusOrder[a.status] - statusOrder[b.status];
    });
  };

  const getStatusStyle = (status: TaskStatus) => {
    if (status === "done") return "text-success";
    else if (status === "pending") return "text-blue-400";
    else if (status === "overdue") return "text-error";
  };

  const handleDirectToWorkspace = (workspace_name: string, workspace_id: number) => {
    navigate(`/my-projects/${workspace_id}/${slugify(workspace_name)}`);
  };

  const sortedTasks = sortTasksByStatus(tasks);

  return (
    <div className="w-full">
      <div className="w-full max-w-[1200px] mx-auto pt-24">
        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Tasks
        </motion.h1>

        <div className="mt-6 max-h-[750px] overflow-auto">
          <AnimatePresence mode="wait">
            {isPending ? (
              <motion.div
                key="skeleton"
                variants={skeletonVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-2"
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <motion.div key={index} variants={skeletonItemVariants} className="px-8 py-4 rounded">
                    <Skeleton className="max-w-[200px] h-[30px] my-2 rounded-full" />
                    <Skeleton className="max-w-[450px] h-[30px] my-2 rounded-full" />
                    <div className="flex justify-between mt-3">
                      <Skeleton className="w-[150px] h-[20px] rounded-full" />
                      <Skeleton className="w-[150px] h-[20px] rounded-full" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="tasks"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-2"
              >
                <AnimatePresence>
                  {sortedTasks.map((task) => (
                    <motion.div
                      key={task.task_id}
                      variants={itemVariants}
                      layout
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover="hover"
                      role="button"
                      className="px-8 py-4 hover:bg-dark-muted/20 rounded cursor-pointer border border-transparent hover:border-dark-muted/30"
                      onClick={() => handleDirectToWorkspace(task.workspace_name, task.workspace_id)}
                    >
                      <div className="flex flex-col pb-2 border-b border-dark-muted/20">
                        {task.status === "overdue" && (
                          <motion.div
                            className="text-error text-sm flex space-x-2 items-center font-bold"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <CircleAlert className="size-4" />
                            <span>Due {timeAgo(task.deadline)}</span>
                          </motion.div>
                        )}

                        <motion.h3 className="text-dark-text text-lg font-medium" layout="position">
                          {task.title}
                        </motion.h3>

                        <motion.p className="text-dark-subtle line-clamp-1" layout="position">
                          {task.description}
                        </motion.p>

                        <motion.div className="flex justify-between items-center mt-4 text-sm" layout="position">
                          <div className={`flex space-x-2 items-center ${getStatusStyle(task.status)} bg-transparent`}>
                            <Calendar className="size-4" />
                            <span>{formatDate(task.deadline)}</span>
                          </div>

                          <div>
                            <span className="text-brand-primary font-medium">
                              {task.workspace_name}/{task.category}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {sortedTasks.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12 text-dark-subtle"
                  >
                    No tasks found
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
