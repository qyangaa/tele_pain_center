import React, { useRef, useState } from "react";
import { Card, Button, Form, Container, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createNewUser, logout } from "../../services/authService";

export default function Registration() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const curUid = useSelector((state) => state.firebase.auth.uid);

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }

    try {
      setError("");
      setLoading(true); //disable sign up button when waiting
      await createNewUser({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        username: nameRef.current.value,
      });
      setLoading(false);
      history.push("/");
    } catch (err) {
      setError("Failed to create an account:", err); //,
      setLoading(false);
    }
  }

  const renderSignUpForm = () => {
    return (
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4"> Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" ref={nameRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          {"Already have an account? "}
          <Link to="/login"> Log In</Link>
        </div>
      </div>
    );
  };

  const renderSignOut = () => {
    return (
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h3>Already signed in</h3>
        <Button onClick={() => logout()}>Sign out</Button>
      </div>
    );
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      stype={{ minHeight: "100vh" }}
    >
      {curUid ? renderSignOut() : renderSignUpForm()}
    </Container>
  );
}
