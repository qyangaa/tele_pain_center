import { Button, Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { ReactComponent as HumanBack } from "../../images/human_back.svg";
import { ReactComponent as HumanFront } from "../../images/human_front.svg";
import "./tracking.css";

export default function Tracking() {
  return (
    <div>
      <div className="image-container">
        {/* <HumanBack className="humanImage" />
        <HumanFront className="humanImage" /> */}
      </div>
    </div>
  );
}
