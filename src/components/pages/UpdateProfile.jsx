import React, { useRef, useState } from "react";
import { Card, Button, Form, Container, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }
    setLoading(true);
    setError("");
    const promises = [];
    const newEmail = emailRef.current.value;
    const newPassword = passwordRef.current.value;
    if (newEmail != currentUser.email) {
      promises.push(updateEmail(newEmail));
    }
    if (newPassword && newPassword != currentUser.password) {
      promises.push(updatePassword(newPassword));
    }

    Promise.all(promises)
      .then(() => {
        //successful
        history.push("/");
      })
      .catch(() => {
        //error
        setError("Failed to create an account");
      })
      .finally(() => {
        setError("");
        setLoading(false);
      });
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      stype={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  defaultValue={currentUser.email}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/"> Cancel </Link>
        </div>
      </div>
    </Container>
  );
}
