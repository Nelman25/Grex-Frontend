import { useFetchTaskAssigneesQuery } from "@/features/tasks/hooks/queries/useFetchTaskAssigneesQuery";
import { getInitials } from "@/utils";
import type { CalendarEvent } from "@schedule-x/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CustomMonthEventProps {
  calendarEvent: CalendarEvent;
  mode?: "workspace" | "user";
}

const eventVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -10,
    transition: { duration: 0.2 },
  },
  hover: {
    scale: 1.02,
    y: -1,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

const expandedVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    zIndex: 1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    zIndex: 50,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
    },
  },
};

const assigneeVariants = {
  hidden: { opacity: 0, scale: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  }),
  hover: { scale: 1.1, zIndex: 10 },
  exit: { opacity: 0, scale: 0, x: 10 },
};

function CustomMonthEvent({ calendarEvent, mode = "workspace" }: CustomMonthEventProps) {
  const { title, start, end, id } = calendarEvent;
  const { data: assignees, isLoading } = useFetchTaskAssigneesQuery(Number(id));
  const [isExpanded, setIsExpanded] = useState(false);
  const isMultiDay = start.split(" ")[0] !== end.split(" ")[0];

  let displayTitle: React.ReactNode = title;

  if (mode === "user") {
    const [taskTitle, workspaceName] = title!.split(" | ");
    displayTitle = (
      <>
        <span className="truncate">{taskTitle}</span>
        <span className="text-brand-primary font-semibold whitespace-nowrap"> | {workspaceName}</span>
      </>
    );
  }

  const maxVisibleAssignees = 3;
  const visibleAssignees = assignees?.slice(0, maxVisibleAssignees) || [];
  const hiddenAssigneesCount = Math.max(0, (assignees?.length || 0) - maxVisibleAssignees);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={isExpanded ? expandedVariants : eventVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover={!isExpanded ? "hover" : undefined}
        whileTap="tap"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "text-white bg-transparent p-3 rounded-lg relative",
          "border border-white/20 backdrop-blur-sm cursor-pointer",
          "flex items-center space-x-3 min-h-[60px]",
          isMultiDay ? "justify-between" : "justify-start"
        )}
        style={{
          background:
            isMultiDay && !isExpanded
              ? "linear-gradient(135deg, rgba(138, 166, 36, 0.1) 0%, rgba(138, 166, 36, 0.1) 100%)"
              : undefined,
        }}
      >
        {/* Content */}
        <div className="flex-1 min-w-0">
          <motion.div className="text-sm font-medium leading-tight truncate" layout="position">
            {displayTitle}
          </motion.div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="mt-2 text-xs text-white/80 space-y-1"
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center">
                  <span className="w-12 font-medium">Start:</span>
                  <span>{new Date(start).toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-12 font-medium">End:</span>
                  <span>{new Date(end).toLocaleString()}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center space-x-1">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex space-x-1">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="size-5 bg-white/20 rounded-full animate-pulse"
                    variants={assigneeVariants}
                    custom={i}
                  />
                ))}
              </motion.div>
            ) : (
              <>
                {visibleAssignees.map((assignee, index) => (
                  <motion.div
                    key={assignee.user_id}
                    custom={index}
                    variants={assigneeVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover="hover"
                    className="relative"
                  >
                    <Avatar className="size-5 border border-white/30">
                      <AvatarImage src={assignee.avatar} alt={assignee.name} />
                      <AvatarFallback className="bg-white/20 text-white text-xs">{getInitials(assignee.name)}</AvatarFallback>
                    </Avatar>
                  </motion.div>
                ))}

                {hiddenAssigneesCount > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-xs bg-white/20 px-1 rounded-full min-w-[20px] text-center"
                  >
                    +{hiddenAssigneesCount}
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <div>
            <div className="absolute"></div>
          </div>
        </div>

        {isMultiDay && !isExpanded && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute top-1 right-1 size-2 bg-green-400 rounded-full"
          />
        )}

        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-1 right-1 text-white/60"
        >
          ▼
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CustomMonthEvent;
