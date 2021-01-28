import React, { useRef, useState } from "react";
import { Card, Button, Form, Container, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../services/authService";
import {
  GetGroups,
  GetMessages,
  SetCurGroup,
  SendMessages,
} from "../../services/ChatService";
import { useSelector, useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const curUid = useSelector((state) => state.firebase.auth.uid);
  const groups = useSelector((state) => state.chatGroupsState);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true); //disable sign up button when waiting
      await login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      await GetGroups(dispatch, curUid);
      if (groups.groups) {
        console.log({ groups: groups.groups });
        const curGroupId = Object.keys(groups.groups)[0];
        SetCurGroup(dispatch, curGroupId);
      }
      setLoading(false);
      history.push("/");
    } catch {
      setError(`Failed to log in`);
      setLoading(false);
    }
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      stype={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4"> Log in</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Log in
              </Button>
            </Form>
            <div className="w-100 text-center mt-2">
              <Link to="/forgot-password">Forgot Password</Link>
            </div>
          </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
          {"Need an account? "}
          <Link to="/registration">Sign up</Link>
        </div>
      </div>
    </Container>
  );
}
