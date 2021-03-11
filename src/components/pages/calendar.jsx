import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as BigCalendar from "react-big-calendar";
import moment from "moment";
import { fetchEvents, selectEvent } from "../../redux/EventsActions";
import {
  addRandomTimeSlot,
  cancelAppointment,
} from "../../services/AppointmentService";
import EventModal from "./EventModal";
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
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchEvents(dispatch, curUid);
  }, [curUid]);

  const openEventHandler = (event) => {
    dispatch(selectEvent(event._id));
    setIsEventModalOpen(true);
  };

  const cancelEventHandler = async (eventId) => {
    // using await to refresh page here, can delete from redux store directly to speed up
    await cancelAppointment(eventId);
    await fetchEvents(dispatch, curUid);
    setIsEventModalOpen(false);
  };

  return (
    <div>
      <button onClick={() => addRandomTimeSlot()}>Add random timeslot</button>
      <BigCalendar.Calendar
        localizer={localizer}
        events={eventsState.events}
        startAccessor="start"
        endAccessor="end"
        selectable
        popup
        onSelectEvent={(event) => openEventHandler(event)}
      />
      {isEventModalOpen && (
        <EventModal
          open={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
          onCancelEvent={(eventId) => cancelEventHandler(eventId)}
        ></EventModal>
      )}
    </div>
  );
}
