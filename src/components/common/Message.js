import React from "react";
import { Card } from "react-bootstrap";
import "./Message.css";

export default function Message(props) {
  const { message, nameDict, uid } = props;
  console.log(nameDict);
  const isUser = uid === message.uid;
  return (
    <div>
      <p className={`message ${isUser && "message__user"}`}>
        {nameDict[message.uid] || "Anonymous"}
        <Card className={`message__card ${isUser && "message__card__user"}`}>
          {message.text}
        </Card>
      </p>
    </div>
  );
}
