import React, { useEffect, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import Message from "../common/Message";
import { db } from "../../services/Firebase/firebase";
import firebase from "firebase/app";
import { useAuth } from "../../contexts/AuthContext";
import { GetGroup, GetMessages } from "../../services/ChatService";
import "./Chat.css";

export default function Chat(props) {
  const [input, setInput] = useState("");
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState([
    { username: "asdas", text: "asdasd" },
    { username: "asdas", text: "asdasd" },
  ]);
  const { uid, username } = useAuth();
  const [receiver, setReceiver] = useState(props.receiver);
  let curGroupId = "cndh7Tr86fjKTKL09Rkx";

  useEffect(() => {
    GetGroup(uid, setGroups);
  }, []);

  useEffect(() => {
    GetMessages(curGroupId, setMessages);
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(input);
    setInput("");
  };
  return (
    <div>
      {console.log(messages)}
      {messages.map((message) => message.text + ";")}
    </div>
  );
}
