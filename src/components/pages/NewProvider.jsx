import React, { useRef, useState } from "react";
import { Card, Button, Form, Container, Alert, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createNewUser } from "../../services/authService";

export default function Registration() {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const address1Ref = useRef();
  const address2Ref = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();
  const organizationRef = useRef();
  const descriptionRef = useRef();
  const phoneRef = useRef();
  const specializationRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }

    try {
      setError("");
      setLoading(true); //disable sign up button when waiting
      // await createNewUser({
      //   email: emailRef.current.value,
      //   password: passwordRef.current.value,
      //   username: nameRef.current.value,
      // });
      setLoading(false);
      history.push("/");
    } catch (err) {
      setError("Failed to create an account:", err); //,
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
            <h2 className="text-center mb-4"> New Health Provider Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId="formGridName"
                  ref={nameRef}
                  required
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name" placeholder="Enter name" />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridOrganization"
                  ref={organizationRef}
                  required
                >
                  <Form.Label>Organization</Form.Label>
                  <Form.Control type="text" placeholder="Organization" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId="formGridEmail"
                  ref={emailRef}
                  required
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridPassword"
                  ref={passwordRef}
                  required
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId="formGridPhone"
                  ref={phoneRef}
                  required
                >
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="number" placeholder="000-000-0000" />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridSpecialization"
                  ref={specializationRef}
                  required
                >
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control as="select" defaultValue="Choose...">
                    <option>Fibromyalgia</option>
                    <option>Arthritis</option>
                    <option>Pain Psychology</option>
                    <option>Physical Therapy</option>
                    <option>Occupational Therapy</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Group
                controlId="formGridAddress1"
                ref={address1Ref}
                required
              >
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
              </Form.Group>

              <Form.Group
                controlId="formGridAddress2"
                ref={address2Ref}
                required
              >
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
              </Form.Group>

              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId="formGridCity"
                  ref={cityRef}
                  required
                >
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridState"
                  ref={stateRef}
                  required
                >
                  <Form.Label>State</Form.Label>
                  <Form.Control as="select" defaultValue="Choose...">
                    <option>CA</option>
                    <option>OR</option>
                    <option>AZ</option>
                    <option>TX</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridZip"
                  ref={zipRef}
                  required
                >
                  <Form.Label>Zip</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Form.Row>
              <Form.Group
                controlId="formGriddescription"
                ref={descriptionRef}
                required
              >
                <Form.Label>Description</Form.Label>
                <Form.Control placeholder="About me" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          {"Already have an account? "}
          <Link to="/login"> Log In</Link>
        </div>
      </div>
    </Container>
  );
}
