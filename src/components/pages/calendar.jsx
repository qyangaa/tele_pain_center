import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as BigCalendar from "react-big-calendar";
import moment from "moment";
import { getUserAppointment } from "../../services/AppointmentService";
import "./Calendar.css";

//  business logic:
// provider side: set available time slot, see self events
// patient side: get available time slot of provider, see events of self
// make appointment:
//      provider: remove time slot, add event with patient name
//      patient: add event with provider name

const localizer = BigCalendar.momentLocalizer(moment);

export default function Calendar() {
  const curUid = useSelector((state) => state.firebase.auth.uid);
  useEffect(() => {
    getUserAppointment({ curUid });
  }, [curUid]);
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
