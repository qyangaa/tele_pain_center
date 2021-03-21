import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";

export default function RecordsList({
  records,
  patientName,
  onOpenFile,
  onDeleteRecord,
}) {
  const curUid = useSelector((state) => state.firebase.auth.uid);
  return (
    <>
      <h3>Records of Patient {patientName}</h3>
      <Table striped borderless hover>
        <thead>
          <tr>
            <th>File name</th>
            <th>File type</th>
            <th>Uploaded on</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.name}</td>
              <td>{record.type}</td>
              <td>{new Date(record.uploadTime).toLocaleDateString()}</td>
              <td>
                <a onClick={() => onOpenFile(record.fileName)}>Open File</a>
              </td>
              <td>
                {curUid === record.creatorId && (
                  <a onClick={() => onDeleteRecord(record.id)}>Delete File</a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
