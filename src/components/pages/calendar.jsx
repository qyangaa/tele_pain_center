import React, { Component } from "react";
import * as BigCalendar from "react-big-calendar";
import moment from "moment";
import "./Calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

export default function Calendar() {
  const events = [
    {
      allDay: false,
      title: "Event",
      start: new Date(2021, 2, 3, 17, 0, 0, 0),
      end: new Date(2021, 2, 3, 18, 0, 0, 0),
    },
  ];
  return (
    <div>
      <BigCalendar.Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}
