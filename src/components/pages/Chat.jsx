import React, { useEffect, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import Message from "../common/Message";
import { db } from "../../services/Firebase/firebase";
import firebase from "firebase/app";
import { useAuth } from "../../contexts/AuthContext";
import {
  GetGroups,
  GetMessages,
  SetCurGroup,
} from "../../services/ChatService";
import { useSelector, useDispatch } from "react-redux";

import "./Chat.css";

export default function Chat(props) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messagesState.messages);
  const messagesState = useSelector((state) => state.messagesState);
  const messagesLoading = useSelector((state) => state.messagesState.isLoading);
  const groups = useSelector((state) => state.chatGroupsState);
  const curGroup = useSelector((state) => state.curGroup);

  const [input, setInput] = useState("");
  // const { currentUid, currentUsername } = useAuth();
  const currentUid = "NGZPqSUZnPWKNBnb1cqZOopv4R33";
  const currentUsername = "Fake";
  let curGroupId = "cndh7Tr86fjKTKL09Rkx";

  useEffect(() => {
    GetGroups(dispatch, currentUid);
    SetCurGroup(dispatch, groups, curGroupId);
    GetMessages(dispatch, curGroupId);
  }, []);

  useEffect(() => {
    console.log("Messages changed, length:", {
      length: messagesState.messages,
    });
  }, [messagesState]);

  useEffect(() => {
    console.log("Groups changed, length:", {
      groups,
    });
  }, [groups]);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(input);
    setInput("");
  };

  const renderMessage = () => {
    return (
      <section>
        Message Length:
        {messages.length}
        {messages.length !== 0 &&
          messages.map((message) => (
            <Message
              message={message}
              nameDict={curGroup.users}
              currentUid={currentUid}
            />
          ))}
      </section>
    );
  };

  return (
    <div className="col-md-9 tight">
      <div className="Chat">
        {/* Header */}
        <header className="settings-tray">Welcome {currentUsername}! </header>
        {/* Message */}
        <div className="message-window">
          {messagesLoading ? "Retrieving Messages" : renderMessage()}
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
