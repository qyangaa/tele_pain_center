import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Card, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import DatePicker from "react-datepicker";
import { createAppointment } from "../../services/AppointmentService";
import SimpleModal from "../common/SimpleModal";
import "react-datepicker/dist/react-datepicker.css";

export default function AppointmentModal({ onClose }) {
  const curUid = useSelector((state) => state.firebase.auth.uid);
  const curName = useSelector((state) => state.firebase.auth.displayName);
  const provider = useSelector((state) => state.providersState.selected);
  const timeSlots = provider.availableTimeSlots.map((slot) => new Date(slot));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState();

  const isDateAvailable = (date) => {
    return timeSlots.some((element) => date.getDate() === element.getDate());
  };

  const getTimeSlot = () => {
    if (
      !selectedTime ||
      !selectedTime.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    )
      return null;
    selectedDate.setHours(moment(selectedTime, "HH:mm").hour());
    selectedDate.setMinutes(moment(selectedTime, "HH:mm").minute());
    selectedDate.setSeconds(0);
    selectedDate.setMilliseconds(0);
    return selectedDate;
  };

  const handleSubmit = async () => {
    const selectedSlot = getTimeSlot();
    console.log({ selectedSlot });
    try {
      await createAppointment({
        provider,
        curUid,
        curName,
        time: selectedSlot,
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SimpleModal onClose={onClose}>
      <Form.Group>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          filterDate={isDateAvailable}
          inline
        />
        <br />
        <Form.Control
          as="select"
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option>Select Time</option>
          {timeSlots
            .filter((element) => element.getDate() === selectedDate.getDate())
            .map((time) => (
              <option>{`${moment(time).format("HH:mm")}`}</option>
            ))}
        </Form.Control>
        <br />
        <Button variant="primary" type="submit" onClick={() => handleSubmit()}>
          Submit
        </Button>{" "}
      </Form.Group>
    </SimpleModal>
  );
}
