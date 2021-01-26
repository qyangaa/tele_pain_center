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

import "./Chat.css";

export default function Chat(props) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messagesState.messages);
  const messagesLoading = useSelector((state) => state.messagesState.isLoading);
  const groups = useSelector((state) => state.chatGroupsState);
  const curGroup = useSelector((state) => state.curGroup);
  const displayName = useSelector((state) => state.firebase.auth.displayname);
  const curUid = useSelector((state) => state.firebase.auth.uid);

  const [input, setInput] = useState("");

  let curGroupId = "cndh7Tr86fjKTKL09Rkx";

  useEffect(() => {
    GetGroups(dispatch, curUid);
    SetCurGroup(dispatch, curGroupId);
    // TODO: increment limit when scroll up
    GetMessages(dispatch, curGroupId, 30);
  }, [curUid]);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(input);
    SendMessages(dispatch, curGroupId, curUid, input);
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
              isUser={curUid == message.uid}
            />
          ))}
      </section>
    );
  };

  function compareGroup(group1, group2) {
    if (!group1 || !group2) {
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
      <div>
        {!groups.isLoading &&
          groups.groups &&
          Object.values(groups.groups)
            .sort(compareGroup)
            .map((group) => (
              <div className="contact-drawer">
                <div className="text">
                  <h6> {getContactName(group)} </h6>

                  <p className="text-muted">
                    {messages[0] && messages[0].text}
                  </p>
                </div>
              </div>
            ))}
      </div>
    );
  };

  return (
    <div className="chat">
      <div className="container">
        <div className="row no_gutters">
          <div className="col-md-3 border-right tight">
            <div className="settings-tray">
              <span className="alignright">Contacts</span>
            </div>
            {renderContact()}
            <hr />
          </div>

          <div className="col-md-9 tight">
            <div className="Chat">
              {/* Header */}
              <header className="settings-tray">Welcome {displayName}! </header>
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
