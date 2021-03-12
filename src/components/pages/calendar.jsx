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
import SimpleModal from "../common/SimpleModal";
import MyOpenSlots from "./MyOpenSlots";
import { ToastContainer, toast } from "react-toastify";
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
  const [selectedSlots, setSelectedSlots] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isTimeSlotsModalOpen, setIsTimeSlotsModalOpen] = useState(false);
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

  const setAvailableSlots = async () => {
    if (curView !== "month") {
      try {
        await addTimeSlots({ curUid, timeSlots: selectedSlots.slots });
        setIsTimeSlotsModalOpen(false);
        toast.dark("Open Time slots updated");
        return;
      } catch (error) {
        toast.dark("Failed to update time slots, please try again");
      }
    }
  };

  const selectSlotsHandler = (slotInfo) => {
    setSelectedSlots(slotInfo);
    setIsTimeSlotsModalOpen(true);
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
        onSelectSlot={(slotInfo) => selectSlotsHandler(slotInfo)}
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
      {isTimeSlotsModalOpen && (
        <SimpleModal onClose={() => setIsTimeSlotsModalOpen(false)}>
          <h3>Set following time slots open for appointment?</h3>
          {selectedSlots.slots.map((slot) => (
            <div>{slot.toLocaleString()}</div>
          ))}
          <Button onClick={setAvailableSlots}>Confirm</Button>
          <Button onClick={() => setIsTimeSlotsModalOpen(false)}>Cancel</Button>
        </SimpleModal>
      )}
      <Button onClick={() => history.push("/myopenslots")}>
        My Open Time Slots
      </Button>
    </div>
  );
}
