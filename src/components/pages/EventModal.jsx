import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Card, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
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

export default function AppointmentModal({ onClose, onCancelEvent }) {
  const curEvent = useSelector((state) => state.eventsState.selected);
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <Card style={MODAL_STYLES}>
        <Card.Body>
          <Card.Title>{`Appointment with ${curEvent.providerName}`}</Card.Title>
          <Card.Text>{`${curEvent.start.toDateString()}`}</Card.Text>
          <Card.Text>
            {`${curEvent.start.toLocaleTimeString()} - ${curEvent.end.toLocaleTimeString()}`}
          </Card.Text>
          <Button onClick={() => onCancelEvent(curEvent._id)}>
            Cancel Appointment
          </Button>
          <Button onClick={onClose}>Close</Button>
        </Card.Body>
      </Card>
    </>,
    document.getElementById("portal")
  );
}
