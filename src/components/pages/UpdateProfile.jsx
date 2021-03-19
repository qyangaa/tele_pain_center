import React, { useRef, useState } from "react";
import { Card, Button, Image, Col, Row, Table, Form } from "react-bootstrap";
import { updateUserProfile } from "../../services/userService";
import { ToastContainer, toast } from "react-toastify";

export default function UpdateProfile({ currentUser, onClose }) {
  const nameRef = useRef();
  const address1Ref = useRef();
  const address2Ref = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();
  const birthDateRef = useRef();
  const sexRef = useRef();
  const imgRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const image = imgRef.current.files[0];
    currentUser.username = nameRef.current.value;
    currentUser.address1 = address1Ref.current.value;
    currentUser.address2 = address2Ref.current.value;
    currentUser.city = cityRef.current.value;
    currentUser.state = stateRef.current.value;
    currentUser.zip = zipRef.current.value;
    currentUser.birthDate = new Date(birthDateRef.current.value).getTime();
    currentUser.sex = sexRef.current.value;
    try {
      const data = await updateUserProfile(currentUser, image);
      console.log(currentUser.image);
      if (data.imageUrl) currentUser.image = data.imageUrl;
      console.log(currentUser.image);

      setLoading(false);
      toast.dark("Profile updated successfully");
      onClose();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.dark("Something went wrong, please try again");
    }
  };

  const renderProfile = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Card className="horizontal_card">
          <Row className="align-items-center">
            <Col xs={0} md={4} lg={3} style={{ margin: 20 }}>
              <div>
                <Image
                  src={currentUser.image}
                  className="profile_img"
                  style={{ alignSelf: "center" }}
                />
                <div>
                  <label htmlFor="image_uploads">
                    Choose profile images to upload (PNG, JPG)
                  </label>
                  <input
                    type="file"
                    id="image_uploads"
                    name="image_uploads"
                    accept=".jpg, .jpeg, .png"
                    ref={imgRef}
                  />
                </div>
              </div>
            </Col>
            <Col>
              <Card.Body>
                <Card.Title>Update Profile</Card.Title>
                <Table striped borderless hover>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={currentUser.username}
                          ref={nameRef}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Address 1</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={currentUser.address1}
                          ref={address1Ref}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Address 2</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={currentUser.address2}
                          ref={address2Ref}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>City</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={currentUser.city}
                          ref={cityRef}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>State</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={currentUser.state}
                          ref={stateRef}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Zip code</td>
                      <td>
                        <input
                          type="number"
                          defaultValue={currentUser.zip}
                          ref={zipRef}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Birthdate</td>
                      <td>
                        <input
                          type="date"
                          defaultValue={
                            new Date(parseInt(currentUser.birthDate))
                              .toISOString()
                              .split("T")[0]
                          }
                          ref={birthDateRef}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Sex</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={currentUser.sex}
                          ref={sexRef}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Button variant="primary" type="submit">
                  Submit
                </Button>{" "}
                <Button variant="primary" onClick={onClose}>
                  Cancel
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Form>
    );
  };

  return (
    <>
      {loading && <div>Loading....</div>} {renderProfile()}
    </>
  );
}
