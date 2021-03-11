import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import * as BigCalendar from "react-big-calendar";
import moment from "moment";
import { fetchEvents, selectEvent } from "../../redux/EventsActions";
import {
  cancelAppointment,
  addTimeSlots,
} from "../../services/AppointmentService";
import EventModal from "./EventModal";
import MyOpenSlots from "./MyOpenSlots";
import "./Calendar.css";

//  business logic:
// provider side: set available time slot, see self events
// patient side: get available time slot of provider, see events of self
// make appointment:
//      provider: remove time slot, add event with patient name
//      patient: add event with provider name

const localizer = BigCalendar.momentLocalizer(moment);

export default function Calendar() {
  const history = useHistory();
  const eventsState = useSelector((state) => state.eventsState);
  const curUid = useSelector((state) => state.firebase.auth.uid);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [curView, setCurView] = useState("month");

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

  const setAvailableSlots = async (slotInfo) => {
    if (curView !== "month") {
      await addTimeSlots({ curUid, timeSlots: slotInfo.slots });
    }
  };

  return (
    <div>
      <BigCalendar.Calendar
        localizer={localizer}
        events={eventsState.events}
        startAccessor="start"
        endAccessor="end"
        selectable
        popup
        onSelectEvent={(event) => openEventHandler(event)}
        onSelectSlot={(slotInfo) => setAvailableSlots(slotInfo)}
        step={60}
        timeslots={1}
        onView={(view) => setCurView(view)}
      />
      {isEventModalOpen && (
        <EventModal
          open={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
          onCancelEvent={(eventId) => cancelEventHandler(eventId)}
        ></EventModal>
      )}
      <Button onClick={() => history.push("/myopenslots")}>
        My Open Time Slots
      </Button>
    </div>
  );
}
