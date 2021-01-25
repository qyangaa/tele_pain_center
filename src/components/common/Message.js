import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./Message.css";

export default function Message(props) {
  const { message, name, isUser } = props;
  return (
    <div>
      <div
        key={`div_${message._id}`}
        className={`message ${isUser && "message__user"}`}
      >
        {name ? name : "Anonymous"}
        <Card
          key={`card_${message._id}`}
          className={`message__card ${isUser && "message__card__user"}`}
        >
          {message.text}
        </Card>
      </div>
    </div>
  );
}
