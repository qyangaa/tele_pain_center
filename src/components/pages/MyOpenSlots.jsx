import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { getMyOpenSlots, removeSlots } from "../../services/AppointmentService";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export default function MyOpenSlots() {
  const history = useHistory();
  const [timeSlots, setTimeSlots] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [selectionChanged, setSelectionChanged] = useState(false);
  const curUid = useSelector((state) => state.firebase.auth.uid);
  useEffect(async () => {
    const newTimeSlots = await getMyOpenSlots(curUid);
    setTimeSlots(newTimeSlots);
  }, [curUid]);

  const handleSelect = (checked, time) => {
    if (checked) {
      selected.add(time.getTime());
      setSelectionChanged(true);
    } else {
      selected.delete(time.getTime());
      setSelectionChanged(true);
    }
    setSelectionChanged(false);
  };

  console.log({ selected });

  const handleDelete = async () => {
    await removeSlots(Array.from(selected));
    const newTimeSlots = timeSlots.filter(
      (time) => !selected.has(time.getTime())
    );
    setTimeSlots(newTimeSlots);
    setSelected(new Set());
    toast.dark("Time Slots Deleted");
  };

  const handleSelectAll = () => {
    setSelected(new Set(timeSlots.map((time) => time.getTime())));
  };

  const handleResetSelection = () => {
    setSelected(new Set());
  };

  return (
    <div>
      <h1>My Open Time Slots</h1>
      <Table striped hover size="sm">
        <thead>
          <tr>
            <th>Time</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {timeSlots &&
            timeSlots.map((time) => (
              <tr as="li" key={time.getTime()}>
                <td>{time.toLocaleString()}</td>
                <td>
                  <input
                    type="checkbox"
                    // checked={selected.has(time.getTime())}
                    onChange={(e) => handleSelect(e.target.checked, time)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Button onClick={handleResetSelection}>Reset Selection</Button>{" "}
      <Button onClick={handleSelectAll}>Select All</Button>{" "}
      <Button onClick={handleDelete}>Delete</Button>{" "}
      <Button onClick={() => history.push("/calendar")}>
        Back To Calendar
      </Button>
    </div>
  );
}
