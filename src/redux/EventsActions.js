import * as ActionTypes from "./ActionTypes";
import { getAppointments } from "../services/AppointmentService";
import firebase from "firebase/app";

// Calling Api from Redux action for easier refractoring to backend
export const fetchEvents = async (dispatch) => {
  dispatch(eventsLoading());
  try {
    const events = await getAppointments();
    dispatch(addEvents(events));
  } catch (error) {
    console.log({ error });
    dispatch(eventsFailed());
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

export const eventsLoading = () => ({
  type: ActionTypes.EVENTS_LOADING,
});

export const eventsFailed = () => ({
  type: ActionTypes.EVENTS_FAILED,
});
