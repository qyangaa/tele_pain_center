import React, { useRef, useState } from "react";
import { Card, Button, Image, Col, Row, Table, Form } from "react-bootstrap";
import {
  uploadRecord,
  uploadRecordFile,
} from "../../../services/recordService";
import { ToastContainer, toast } from "react-toastify";

export default function UploadRecord({ patient, exitRecordUpload }) {
  const filenameRef = useRef();
  const typeRef = useRef();
  const fileRef = useRef();
  const [loading, setLoading] = useState(false);
  const [systemFileName, setSystemFileName] = useState("");

  const handleUpload = async () => {
    const file = fileRef.current.files[0];
    try {
      const name = await uploadRecordFile(patient.uid, file);
      setSystemFileName(name);
      toast.dark("File uploaded successfully");
      return;
    } catch (error) {
      toast.dark("Failed to upload file, please try again");
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const record = {};
    record.name = filenameRef.current.value;
    record.type = typeRef.current.value;
    record.fileName = systemFileName;
    try {
      const res = await uploadRecord(patient.uid, record);
      setLoading(false);
      toast.dark("File uploaded successfully");
      exitRecordUpload();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.dark("Something went wrong, please try again");
    }
  };

  const renderForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Card className="horizontal_card">
          <Card.Body>
            <Card.Title>Upload New Record for {patient.name}</Card.Title>
            <Table striped borderless hover>
              <tbody>
                <tr>
                  <td>File</td>
                  <td>
                    <input type="file" id="file_uploads" ref={fileRef} />
                    <a onClick={handleUpload}>Upload File</a>
                  </td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>
                    <input type="text" ref={filenameRef} />
                  </td>
                </tr>
                <tr>
                  <td>File type</td>
                  <td>
                    <input type="text" ref={typeRef} />
                  </td>
                </tr>
              </tbody>
            </Table>
            <Button variant="primary" type="submit">
              Submit
            </Button>{" "}
            <Button variant="primary" onClick={exitRecordUpload}>
              Cancel
            </Button>
          </Card.Body>
        </Card>
      </Form>
    );
  };

  return (
    <>
      {loading && <div>Loading....</div>} {renderForm()}
    </>
  );
}
