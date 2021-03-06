import React from "react";
import { Card, Button, Image, Col, Row, Table } from "react-bootstrap";
import { getRecords } from "../../../services/recordService";

export default function MyPatients({ patients, onGetRecords }) {
  const getPatientRecords = async (patient) => {
    const records = await getRecords(patient.uid);
    onGetRecords(records, patient);
  };
  return (
    <div className="general">
      <h1>My Patients</h1>
      <Table striped borderless hover>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.uid}>
              <td>
                <a className="btn"> {patient.name} </a>
              </td>
              <td>
                <a className="btn" onClick={() => getPatientRecords(patient)}>
                  Records
                </a>
              </td>
              <td>
                <a className="btn"> Add File </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
