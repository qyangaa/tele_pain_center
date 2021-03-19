import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
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
  const [selectedDates, setSelectedDates] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isTimeSlotsModalOpen, setIsTimeSlotsModalOpen] = useState(false);
  const [curView, setCurView] = useState("month");
  const [workingHours, setWorkingHours] = useState({ start: 9, end: 18 });

  const dispatch = useDispatch();
  useEffect(() => {
    if (curUid) fetchEvents(dispatch, curUid);
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
    try {
      await addTimeSlots({ curUid, timeSlots: selectedSlots });
      setIsTimeSlotsModalOpen(false);
      toast.dark("Open Time slots updated");
      return;
    } catch (error) {
      toast.dark("Failed to update time slots, please try again");
    }
  };

  const selectSlotsHandler = (slotInfo) => {
    if (curView !== "month") {
      if (slotInfo.slots[0] < new Date()) {
        toast.dark("Please select a future time slot");
        return;
      }
      setSelectedSlots(slotInfo.slots);
    } else {
      // Hard coding for now
      setSelectedDates(
        slotInfo.slots.map((time) =>
          time.toLocaleString("en-us", {
            weekday: "short",
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        )
      );
      const timeSlots = [];
      for (const slot of slotInfo.slots) {
        for (const hour in _.range(workingHours.start, workingHours.end)) {
          if (slot < new Date()) {
            toast.dark("Please select a future time slot");
            return;
          }
          const curTimeSlot = new Date(slot.setHours(hour));
          timeSlots.push(curTimeSlot);
        }
      }
      setSelectedSlots(timeSlots);
    }

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
          {curView !== "month" ? (
            selectedSlots.map((slot) => (
              <div>
                {slot.toLocaleString("en-us", {
                  weekday: "short",
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                })}
              </div>
            ))
          ) : (
            <div>
              {selectedDates.map((date) => (
                <div>{date}</div>
              ))}{" "}
              Everyday from {workingHours.start}:00 to {workingHours.end}:00
            </div>
          )}
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
