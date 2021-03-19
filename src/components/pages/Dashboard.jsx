import React, { useState, useEffect } from "react";
import { Card, Button, Image, Col, Row, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UpdateProfile from "./UpdateProfile";
import { logout } from "../../services/authService";
import { getUserProfile } from "../../services/userService";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [updating, setUpdating] = useState(false);
  const curUid = useSelector((state) => state.firebase.auth.uid);
  const history = useHistory();

  useEffect(async () => {
    if (curUid) {
      const user = await getUserProfile();
      setCurrentUser(user);
    }
  }, [curUid]);

  const renderProfile = () => {
    return (
      <Card className="horizontal_card">
        <Row className="align-items-center">
          <Col xs={0} md={4} lg={3} style={{ margin: 20 }}>
            <div>
              <Image
                src={currentUser.image}
                className="profile_img"
                style={{ alignSelf: "center" }}
              />
            </div>
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>{currentUser.username}</Card.Title>
              <Table striped borderless hover>
                <tbody>
                  <tr>
                    <td>Address</td>
                    <td>{`${currentUser.address1} ${currentUser.address2},${currentUser.city}, ${currentUser.state}, ${currentUser.zip}`}</td>
                  </tr>
                  <tr>
                    <td>Birthdate</td>
                    <td>{`${new Date(
                      parseInt(currentUser.birthDate)
                    ).toLocaleDateString()}`}</td>
                  </tr>
                  <tr>
                    <td>Sex</td>
                    <td>Female</td>
                  </tr>
                </tbody>
              </Table>
              <Button variant="primary" onClick={() => setUpdating(true)}>
                Update Profile
              </Button>{" "}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  };

  const renderLoading = () => {
    return <div>Loading...</div>;
  };

  return (
    <>
      {currentUser ? (
        updating ? (
          <UpdateProfile
            currentUser={currentUser}
            onClose={() => setUpdating(false)}
          />
        ) : (
          renderProfile()
        )
      ) : (
        renderLoading()
      )}
    </>
  );
}
