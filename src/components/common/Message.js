import React from "react";
import { Card } from "react-bootstrap";
import "./Message.css";

export default function Message(props) {
  const { message, nameDict, uid } = props;
  console.log(nameDict);
  const isUser = uid === message.uid;
  return (
    <div>
      <Card className={`message ${isUser && "message__user"}`}>
        {message.text} [{nameDict[message.uid]}]
      </Card>
    </div>
  );
}
