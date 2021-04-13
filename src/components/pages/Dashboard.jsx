import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Image,
  Col,
  Row,
  Table,
  Tabs,
  Tab,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UpdateProfile from "./UpdateProfile";
import UploadRecord from "./providerPages/UploadRecord";
import { logout } from "../../services/authService";
import { getUserProfile } from "../../services/userService";
import { getFileUrl, deleteRecord } from "../../services/recordService";
import MyPatients from "./providerPages/MyPatients";
import RecordsList from "./providerPages/RecordsList";
import { ToastContainer, toast } from "react-toastify";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [updating, setUpdating] = useState(false);
  const curUid = useSelector((state) => state.firebase.auth.uid);
  const history = useHistory();
  const [records, setRecords] = useState([]);
  const [patient, setPatient] = useState("");
  const [key, setKey] = useState("Profile");

  useEffect(async () => {
    if (curUid) {
      const user = await getUserProfile();
      setCurrentUser(user);
      if (!user.isProvider) {
        setPatient({ name: "You", uid: curUid });
      }
    }
  }, [curUid]);

  const handleRecords = (newRecords, patient) => {
    setRecords(newRecords);
    setPatient(patient);
    setKey("Records");
  };

  const handleOpenFile = async (fileName) => {
    const url = await getFileUrl(patient.uid, fileName);
    window.open(url, "_blank");
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      await deleteRecord(patient.uid, recordId);
      handleRecords([], "");
      setKey("Patients");
      toast.dark("Record deleted successfully");
    } catch (error) {
      console.log({ error });
      toast.dark("Something went wrong, please try again");
    }
  };

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
      <Tabs id="controlled-tab" activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey="Profile" title="Profile">
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
        </Tab>
        {currentUser && currentUser.isProvider && (
          <Tab eventKey="Patients" title="Patients">
            <MyPatients
              patients={currentUser.myPatients}
              onGetRecords={handleRecords}
            />
          </Tab>
        )}
        {patient && (
          <Tab eventKey="Records" title="Records">
            <RecordsList
              records={records}
              patientName={patient.name}
              onOpenFile={handleOpenFile}
              onDeleteRecord={handleDeleteRecord}
            />
          </Tab>
        )}
        {patient && (
          <Tab eventKey="Upload" title="Record Upload">
            <UploadRecord
              patient={patient}
              exitRecordUpload={() => setKey("Patients")}
            />
          </Tab>
        )}
      </Tabs>
    </>
  );
}
