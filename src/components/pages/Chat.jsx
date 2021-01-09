import React, { useEffect, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import Message from "../common/Message";
import { db } from "../../services/Firebase/firebase";
import firebase from "firebase/app";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { username: "asdas", text: "asdasd" },
    { username: "asdas", text: "asdasd" },
  ]);
  const [username, setUsername] = useState("Temp2");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .limitToLast(10)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("messages").add({
      username: username,
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // setMessages([...messages, { username: username, text: input }]);
    setInput("");
  };
  return (
    <div>
      {/* Header */}
      <h2>Welcome {username}! </h2>
      {/* Message */}
      <div>
        {messages.map((message) => (
          <Message message={message} username={username} />
        ))}
      </div>
      {/* Input */}
      <Form inline>
        <FormControl
          id="userInpuut"
          placeholder="Enter Message"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button disabled={!input} type="submit" onClick={sendMessage}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
