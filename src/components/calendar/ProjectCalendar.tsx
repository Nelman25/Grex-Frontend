import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewDay, createViewMonthGrid } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { useEffect, useState } from "react";
import "@schedule-x/theme-default/dist/index.css";
import type { CalendarEvent } from "@/types";
import CustomMonthEvent from "./CustomMonthEvent";

type Props = {
  events: CalendarEvent[];
  mode?: "workspace" | "user";
};

export default function ProjectCalendar({ events, mode }: Props) {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    views: [createViewMonthGrid(), createViewDay()],
    events,
    plugins: [eventsService],
  });

  useEffect(() => {
    eventsService.getAll();
  }, [eventsService]);

  const customComponents = {
    monthGridEvent: (props: { calendarEvent: CalendarEvent }) => <CustomMonthEvent {...props} mode={mode} />,
  };

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} customComponents={customComponents} />
    </div>
  );
}
