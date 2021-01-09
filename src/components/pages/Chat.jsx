import React, { useEffect, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import Message from "../common/Message";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { username: "asdas", text: "asdasd" },
    { username: "asdas", text: "asdasd" },
  ]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  const submit = (event) => {
    event.preventDefault();
    setMessages([...messages, { username: username, text: input }]);
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
        <Button disabled={!input} type="submit" onClick={submit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
