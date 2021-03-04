import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Card, Button, Form } from "react-bootstrap";
import moment from "moment";
import DatePicker from "react-datepicker";
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

export default function AppointmentModal({ open, children, onClose }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState();
  if (!open) return null;

  const timeSlots = [
    new Date(2021, 3, 4, 17, 0, 0, 0),
    new Date(2021, 3, 4, 18, 0, 0, 0),
    new Date(2021, 3, 5, 15, 0, 0, 0),
    new Date(2021, 3, 5, 16, 0, 0, 0),
  ];

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
    return selectedDate;
  };

  const handleSubmit = () => {
    console.log(getTimeSlot());
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
          {children}
        </Card.Body>
      </Card>
    </>,
    document.getElementById("portal")
  );
}
