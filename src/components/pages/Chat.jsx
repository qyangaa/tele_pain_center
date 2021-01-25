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
  SendMessages,
} from "../../services/ChatService";
import { useSelector, useDispatch } from "react-redux";

import "./Chat.css";

export default function Chat(props) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messagesState.messages);
  const messagesLoading = useSelector((state) => state.messagesState.isLoading);
  const groups = useSelector((state) => state.chatGroupsState);
  const curGroup = useSelector((state) => state.curGroup);
  const [input, setInput] = useState("");
  const { currentUid, currentUsername } = useAuth();
  let curGroupId = "cndh7Tr86fjKTKL09Rkx";

  useEffect(() => {
    console.log(currentUid);
    GetGroups(dispatch, currentUid);
    SetCurGroup(dispatch, curGroupId);
    GetMessages(dispatch, curGroupId);
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(input);
    SendMessages(dispatch, curGroupId, currentUid, input);
    setInput("");
  };

  const renderMessage = () => {
    return (
      <section>
        {messages.length !== 0 &&
          messages.map((message) => (
            <Message
              message={message}
              name={
                groups.groups[curGroupId] &&
                groups.groups[curGroupId].users[message.uid]
              }
              isUser={currentUid == message.uid}
            />
          ))}
      </section>
    );
  };

  return (
    <div className="main">
      <div className="container">
        <div className="row no_gutters">
          <div className="col-md-3 border-right tight">
            <div className="settings-tray">
              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="Profile Image"
                className="profile-image"
              />
              <span className="alignright">icon</span>
            </div>
            <div className="contact-drawer">
              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="Profile Image"
                className="profile-image"
              />
              <div className="text">
                <h6>Doctor Name</h6>

                <p className="text-muted">Last meassage sent</p>
              </div>
            </div>
            <hr />
          </div>

          <div className="col-md-9 tight">
            <div className="Chat">
              {/* Header */}
              <header className="settings-tray">
                Welcome {currentUsername}!{" "}
              </header>
              {/* Message */}
              <div className="message-window">
                <section>
                  {messagesLoading ? "Retrieving Messages" : renderMessage()}
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
        </div>
      </div>
    </div>
  );
}
