import { Button, Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { GetGroup, GetMessages } from "../../services/ChatService";

export default function Tracking() {
  const [groups, setGroups] = useState({ users: [], _id: "" });

  useEffect(() => {
    //componentDidMount
    GetGroup("NGZPqSUZnPWKNBnb1cqZOopv4R33", setGroups);
    GetMessages("cndh7Tr86fjKTKL09Rkx");
  }, []);
  return <div>{console.log()}</div>;
}
