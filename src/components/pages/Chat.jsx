import React, { useEffect, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import Message from "../common/Message";
import {
  GetGroups,
  GetMessages,
  SetCurGroup,
  SendMessages,
} from "../../services/ChatService";
import { useSelector, useDispatch } from "react-redux";

import { BsDot } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

import "./Chat.css";

export default function Chat(props) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messagesState.messages);
  const messagesLoading = useSelector((state) => state.messagesState.isLoading);
  const groups = useSelector((state) => state.chatGroupsState);
  const curGroup = useSelector((state) => state.curGroup.curGroup);
  const displayName = useSelector((state) => state.firebase.auth.displayname);
  const curUid = useSelector((state) => state.firebase.auth.uid);

  const [input, setInput] = useState("");

  useEffect(() => {
    GetGroups(dispatch, curUid);
  }, [curUid]);

  useEffect(() => {
    GetGroups(dispatch, curUid);
    GetMessages(dispatch, curGroup, 30);
  }, [curGroup]);

  useEffect(() => {
    if (!curGroup.curGroup && groups.groups) {
      const curGroupTemp = Object.values(groups.groups).sort(compareGroup)[0];
      if (curGroupTemp && !curGroup) {
        SetCurGroup(dispatch, curGroupTemp._id);
      }
    }
  }, [groups]);

  const sendMessage = (event) => {
    event.preventDefault();
    SendMessages(dispatch, curGroup, curUid, input);
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
                groups.groups[curGroup] &&
                groups.groups[curGroup].users[message.uid]
              }
              isUser={curUid == message.uid}
            />
          ))}
      </section>
    );
  };

  function compareGroup(group1, group2) {
    if (!group1 || !group2 || !group1[1] || !group2[1]) {
      return 0;
    }
    if (group1[1].data.timestamp.seconds > group2[1].data.seconds) {
      return 1;
    }
    if (group1[1].data.timestamp.seconds < group2[1].data.seconds) {
      return -1;
    }
    return 0;
  }

  function getContactName(group) {
    if (!group || !group.users) {
      return;
    }
    const groupMembers = Object.entries(group.users);

    const contact = groupMembers.filter((member) => member[0] != curUid)[0];
    return contact[1];
  }

  const renderContact = () => {
    return (
      <div className="contact-list">
        <div className="contact-drawer">
          {!groups.isLoading &&
            groups.groups &&
            Object.values(groups.groups)
              .sort(compareGroup)
              .map((group) => (
                <div
                  className={`item ${group._id == curGroup ? "curItem" : ""}`}
                  onClick={() => SetCurGroup(dispatch, group._id)}
                >
                  <BsDot className="icon" />
                  {getContactName(group)}
                </div>
              ))}
        </div>
      </div>
    );
  };

  return (
    <div className="chat">
      <div className="container">
        <div className="row">
          <div className="col-md-3 contacts">
            <div className="header">Contact List</div>
            {renderContact()}
          </div>

          <div className="col-md-9 tight">
            <div className="Chat">
              <div className="header">
                {getContactName(groups.groups[curGroup])}
              </div>
              {/* Message */}
              <div className="message-window">
                <div className="messages">
                  {messagesLoading ? "Retrieving Messages" : renderMessage()}
                </div>
                <div id="anchor"></div>
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
                <IoSend
                  disabled={!input}
                  type="submit"
                  onClick={sendMessage}
                  className="send-button"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
