import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./Message.css";

export default function Message(props) {
  const { message, nameDict, uid } = props;

  const isUser = uid === message.uid;
  console.log("Rendering message:", message);
  return (
    <div>
      <p id={message._id} className={`message ${isUser && "message__user"}`}>
        {nameDict && nameDict[message.uid]}
        <Card
          id={message._id}
          className={`message__card ${isUser && "message__card__user"}`}
        >
          {message.text}
        </Card>
      </p>
    </div>
  );
}
