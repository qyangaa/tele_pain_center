import React from "react";
import { Card } from "react-bootstrap";
import "./Message.css";

export default function Message(props) {
  const { message, username } = props;
  const isUser = username === message.username;
  return (
    <div>
      <Card className={`message ${isUser && "message__user"}`}>
        {message.text} [{username}]
      </Card>
    </div>
  );
}
