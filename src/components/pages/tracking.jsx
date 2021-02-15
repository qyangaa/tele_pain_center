import React, { useState, useEffect } from "react";
import "./tracking.css";

// Redux components
import { sendData, getData } from "../../redux/actions/dashboardAction";
import { useSelector, useDispatch } from "react-redux";

export default function Tracking() {
  const responseToPost = useSelector(
    (state) => state.dashboardReducer.dataFromBackend.express
  );
  const [post, setPost] = useState("");
  const response = useSelector(
    (state) => state.dashboardReducer.getDataFromBackend.express
  );
  const dispatch = useDispatch();

  const callApi = async () => {
    getData("/api/hello")(dispatch);
  };

  useEffect(() => {
    callApi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendData("/api/data", { post })(dispatch);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>{response}</p>
      <form onSubmit={handleSubmit}>
        <p>
          <strong>Post to Server:</strong>
        </p>
        <input
          type="text"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p style={{ color: "blue" }}>
        <b>{responseToPost}</b>
      </p>
    </div>
  );
}
