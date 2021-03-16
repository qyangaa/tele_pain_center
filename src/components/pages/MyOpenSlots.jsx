import React, { useState, useEffect, useRef } from "react";
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
  const [checked, setChecked] = useState(false);
  const curUid = useSelector((state) => state.firebase.auth.uid);
  const checkRef = useRef(null);
  useEffect(async () => {
    const newTimeSlots = await getMyOpenSlots(curUid);
    setTimeSlots(newTimeSlots);
  }, [curUid]);

  useEffect(() => {}, [selectionChanged]);

  const handleSelect = (time) => {
    const curSelected = new Set(selected);
    if (!selected.has(time.getTime())) {
      curSelected.add(time.getTime());
    } else {
      curSelected.delete(time.getTime());
    }
    setSelected(curSelected);
  };

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
                    checked={selected.has(time.getTime())}
                    onClick={() => handleSelect(time)}
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
