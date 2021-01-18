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
  const [groups, setGroups] = useState();
  const [curGroup, setCurGroup] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState();
  // const { currentUid, currentUsername } = useAuth();
  const currentUid = "NGZPqSUZnPWKNBnb1cqZOopv4R33";
  const currentUsername = "Fake";
  let curGroupId = "cndh7Tr86fjKTKL09Rkx";

  // useEffect(() => {
  //   GetGroup(currentUid, curGroupId).then((groups, curGroup) => {
  //     setCurGroup(curGroup);
  //     setGroups(groups);
  //     GetMessages(curGroupId).then((messages) => {
  //       setMessages(messages);
  //       setIsLoading(false);
  //     });
  //   });
  // }, []);

  useEffect(async () => {
    let didCancel = false;
    async function fetchData() {
      !didCancel && setIsLoading(true);
      let groupResults, messageResults;
      try {
        groupResults = await GetGroup(currentUid, curGroupId);
        messageResults = await GetMessages(curGroupId);
        setCurGroup(groupResults.curGroup);
        setGroups(groupResults.groups);
        setMessages(messageResults);
      } catch (error) {
        console.log("Error loading groups and mesages:", error);
      } finally {
        !didCancel && setIsLoading(false);
      }
    }
    await fetchData();
    return () => {
      didCancel = true;
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(input);
    setInput("");
  };

  const renderMessage = (messages) => {
    return (
      <section>
        Message Length:
        {console.log(messages)}
        {messages.length}
        {messages &&
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
          {isLoading ? "Retrieving Messages" : renderMessage(messages)}
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
