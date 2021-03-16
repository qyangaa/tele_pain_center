import * as ActionTypes from "./ActionTypes";
import { getUserAppointment } from "../services/AppointmentService";
import firebase from "firebase/app";

// Calling Api from Redux action for easier refractoring to backend
export const fetchEvents = async (dispatch, curUid) => {
  try {
    const token = await firebase.auth().currentUser.getIdToken();
    const res = await fetch("patient/appointments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    console.log({ data });
    // const events = await getUserAppointment({ curUid });
    if (!data) return;
    dispatch(addEvents(data.events));
  } catch (error) {
    console.log({ error });
  }
};

export const addEvents = (events) => ({
  type: ActionTypes.ADD_EVENTS,
  payload: { events },
});

export const selectEvent = (eventId) => ({
  type: ActionTypes.SELECT_EVENT,
  payload: { eventId },
});
