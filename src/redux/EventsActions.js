import * as ActionTypes from "./ActionTypes";
import { getUserAppointment } from "../services/AppointmentService";

// Calling Api from Redux action for easier refractoring to backend
export const fetchEvents = async (dispatch, curUid) => {
  try {
    const events = await getUserAppointment({ curUid });
    if (!events) return;
    dispatch(addEvents(events));
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
