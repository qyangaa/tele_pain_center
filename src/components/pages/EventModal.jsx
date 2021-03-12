import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Card, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import SimpleModal from "../common/SimpleModal";
import "react-datepicker/dist/react-datepicker.css";

export default function AppointmentModal({ onClose, onCancelEvent }) {
  const curEvent = useSelector((state) => state.eventsState.selected);
  return (
    <SimpleModal onClose={onClose}>
      <Card.Title>{`Appointment with ${curEvent.providerName}`}</Card.Title>
      <Card.Text>{`${curEvent.start.toDateString()}`}</Card.Text>
      <Card.Text>
        {`${curEvent.start.toLocaleTimeString()} - ${curEvent.end.toLocaleTimeString()}`}
      </Card.Text>
      <Button onClick={() => onCancelEvent(curEvent._id)}>
        Cancel Appointment
      </Button>
    </SimpleModal>
  );
}
