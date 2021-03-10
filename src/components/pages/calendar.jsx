import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as BigCalendar from "react-big-calendar";
import moment from "moment";
import { fetchEvents } from "../../redux/EventsActions";
import { addRandomTimeSlot } from "../../services/AppointmentService";
import "./Calendar.css";

//  business logic:
// provider side: set available time slot, see self events
// patient side: get available time slot of provider, see events of self
// make appointment:
//      provider: remove time slot, add event with patient name
//      patient: add event with provider name

const localizer = BigCalendar.momentLocalizer(moment);

export default function Calendar() {
  const eventsState = useSelector((state) => state.eventsState);
  const curUid = useSelector((state) => state.firebase.auth.uid);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchEvents(dispatch, curUid);
  }, [curUid]);
  const events = eventsState.events.map((event) => {
    return {
      title: event.eventName,
      start: event.start,
      end: event.end,
    };
  });
  return (
    <div>
      <button onClick={() => addRandomTimeSlot()}>Add random timeslot</button>
      <BigCalendar.Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}
