import React, { useEffect, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import Message from "../common/Message";
import { db } from "../../services/Firebase/firebase";
import firebase from "firebase/app";
import { useAuth } from "../../contexts/AuthContext";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { username: "asdas", text: "asdasd" },
    { username: "asdas", text: "asdasd" },
  ]);
  const { uid, username } = useAuth();
  const groupid = "cndh7Tr86fjKTKL09Rkx";
  const groupRef = db.collection("groups").doc(groupid);
  const usersRef = db.collection("users");
  const messagesRef = groupRef.collection("messages");

  const [nameDict, setNameDict] = useState({});

  const getUserInfo = (uid) => {
    usersRef
      .doc(uid)
      .get()
      .then((doc) => {
        setNameDict({ ...nameDict, [uid]: doc.data().username });
      });
  };

  useEffect(() => {
    groupRef.get().then((doc) => {
      doc.data().users.map((uid) => {
        getUserInfo(uid);
      });
    });
  }, []);

  //  TODO: problem with asynchronous update of nameDict. See how to execute async function sequentialy
  //https://medium.com/@wereHamster/beware-react-setstate-is-asynchronous-ce87ef1a9cf3
  useEffect(() => {
    messagesRef
      .orderBy("timestamp", "asc")
      .limitToLast(10)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    messagesRef.add({
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
          <Message message={message} nameDict={nameDict} uid={uid} />
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
