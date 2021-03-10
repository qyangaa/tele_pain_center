import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Card, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import DatePicker from "react-datepicker";
import { createAppointment } from "../../services/AppointmentService";
import "react-datepicker/dist/react-datepicker.css";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#122",
  padding: "50px",
  zIndex: 1000,
  color: "#000",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export default function AppointmentModal({ onClose }) {
  const curUid = useSelector((state) => state.firebase.auth.uid);
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
        providerId: provider._id,
        curUid: curUid,
        time: selectedSlot,
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <Card style={MODAL_STYLES}>
        <Card.Body>
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
                .filter(
                  (element) => element.getDate() === selectedDate.getDate()
                )
                .map((time) => (
                  <option>{`${moment(time).format("HH:mm")}`}</option>
                ))}
            </Form.Control>
            <br />
            <Button
              variant="primary"
              type="submit"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>{" "}
            <Button onClick={onClose}>Close</Button>
          </Form.Group>
        </Card.Body>
      </Card>
    </>,
    document.getElementById("portal")
  );
}
