import React from "react";
import { Card, Button } from "react-bootstrap";
import ReactDom from "react-dom";

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

export default function SimpleModal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div>{children} </div>
        <Button onClick={onClose}>Close</Button>
      </div>
    </>,
    document.getElementById("portal")
  );
}
