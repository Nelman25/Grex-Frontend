import type { CalendarEvent } from "@schedule-x/calendar";

function CustomMonthEvent({ calendarEvent }: { calendarEvent: CalendarEvent }) {
  const { title, start, end, description } = calendarEvent;
  const isMultiDay = start.split(" ")[0] !== end.split(" ")[0]; // Check if event spans multiple days

  return (
    <div
      style={{
        backgroundColor: "transparent",
        color: "#ffffff",
        padding: "4px",
        borderRadius: "4px",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: isMultiDay ? "space-between" : "flex-start",
      }}
    >
      <span>{title}</span>
      {isMultiDay && (
        <span style={{ fontSize: "10px" }}>
          {start.split(" ")[0]} - {end.split(" ")[0]}
        </span>
      )}
      
    </div>
  );
}

export default CustomMonthEvent;
