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
  const [curGroup, setCurGroup] = useState({});
  const [users, setUsers] = useState({});
  const [messages, setMessages] = useState([{}]);
  // const { currentUid, currentUsername } = useAuth();
  const currentUid = "NGZPqSUZnPWKNBnb1cqZOopv4R33";
  const currentUsername = "Fake";
  let curGroupId = "cndh7Tr86fjKTKL09Rkx";

  useEffect(async () => {
    const { groups, curGroup } = await GetGroup(currentUid, curGroupId);
    console.log(curGroup);
    setCurGroup(curGroup);
    setGroups(groups);
  }, []);

  useEffect(async () => {
    const messages = await GetMessages(curGroupId);
    setMessages(messages);
    console.log(messages);
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(input);
    setInput("");
  };
  return (
    <div className="col-md-9 tight">
      <div className="Chat">
        {/* Header */}
        <header className="settings-tray">Welcome {currentUsername}! </header>
        {/* Message */}
        <div className="message-window">
          <section>
            {messages.map((message) => (
              <Message
                message={message}
                nameDict={curGroup.users}
                currentUid={currentUid}
              />
            ))}
          </section>
        </div>

        {/* Input */}
        <form className="input-bar">
          <FormControl
            id="userInpuut"
            placeholder="Enter Message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="input-box"
          />
          <Button disabled={!input} type="submit" onClick={sendMessage}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
