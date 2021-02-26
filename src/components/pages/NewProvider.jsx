import React, { useRef, useState } from "react";
import { Card, Button, Form, Container, Alert, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createProvider } from "../../services/authService";
import { ToastContainer, toast } from "react-toastify";

import { generateProviders } from "../../services/data/dummyDataGenerator";

import "react-toastify/dist/ReactToastify.css";

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
  const specialtyRef = useRef();
  const imageRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const generate = async () => {
    const providers = generateProviders(false);
    for (let provider of providers) {
      await createProvider(provider);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Password do not match");
    // }

    try {
      setError("");
      setLoading(true); //disable sign up button when waiting
      await createProvider({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        name: nameRef.current.value,
        address1: address1Ref.current.value,
        address2: address2Ref.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        zip: zipRef.current.value,
        organization: organizationRef.current.value,
        description: descriptionRef.current.value,
        phone: phoneRef.current.value,
        specialty: specialtyRef.current.value,
        image: imageRef.current.value,
      });

      setLoading(false);

      // history.push("/");
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
                <Form.Group as={Col} controlId="formGridName" required>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    ref={nameRef}
                    placeholder="Enter name"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridOrganization" required>
                  <Form.Label>Organization</Form.Label>
                  <Form.Control
                    type="text"
                    ref={organizationRef}
                    placeholder="Organization"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail" required>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword" required>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Password"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPhone" required>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    ref={phoneRef}
                    placeholder="0000000000"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridspecialty" required>
                  <Form.Label>Specialty</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    ref={specialtyRef}
                  >
                    <option>Fibromyalgia</option>
                    <option>Arthritis</option>
                    <option>Pain Psychology</option>
                    <option>Physical Therapy</option>
                    <option>Occupational Therapy</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1" required>
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" ref={address1Ref} />
              </Form.Group>

              <Form.Group controlId="formGridAddress2" required>
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  placeholder="Apartment, studio, or floor"
                  ref={address2Ref}
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity" required>
                  <Form.Label>City</Form.Label>
                  <Form.Control ref={cityRef} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState" required>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    ref={stateRef}
                  >
                    <option>CA</option>
                    <option>OR</option>
                    <option>AZ</option>
                    <option>TX</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip" required>
                  <Form.Label>Zip</Form.Label>
                  <Form.Control type="number" ref={zipRef} />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGriddescription" required>
                <Form.Label>Description</Form.Label>
                <Form.Control ref={descriptionRef} placeholder="About me" />
              </Form.Group>

              <Form.Group controlId="formGridImagr" required>
                <Form.Label>Image URL</Form.Label>
                <Form.Control ref={imageRef} placeholder="Image URL" />
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
      <Button variant="primary" onClick={() => generate()}>
        Generate
      </Button>
    </Container>
  );
}
