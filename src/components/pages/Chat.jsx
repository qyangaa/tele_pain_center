import React, { useEffect, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import Message from "../common/Message";
import { db } from "../../services/Firebase/firebase";
import firebase from "firebase/app";
import { useAuth } from "../../contexts/AuthContext";
import "./Chat.css";

export default function Chat(props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { username: "asdas", text: "asdasd" },
    { username: "asdas", text: "asdasd" },
  ]);
  const { uid, username } = useAuth();
  const [receiver, setReceiver] = useState(props.receiver);
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
              <header className="settings-tray">Welcome {username}! </header>
              {/* Message */}
              <div className="message-window">
                <section>
                  {messages.map((message) => (
                    <Message message={message} nameDict={nameDict} uid={uid} />
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
        </div>
      </div>
    </div>
  );
}
