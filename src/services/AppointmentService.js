import firebase from "firebase/app";

import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";

import { requestWithToken } from "./apiService";

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

export const getMyOpenSlots = async () => {
  try {
    const data = await requestWithToken({
      url: "provider/opentimeslots",
      method: "GET",
    });
    if (!data) return;
    const timeSlots = data.timeSlots.map((time) => new Date(time));
    return timeSlots;
  } catch (error) {
    console.log(error);
  }
};

export const removeSlots = async (timeSlots) => {
  try {
    await requestWithToken({
      url: "provider/opentimeslots",
      method: "DELETE",
      body: timeSlots,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createAppointment = async ({
  providerId,
  providerName,
  curName,
  time,
}) => {
  try {
    const data = await requestWithToken({
      url: "/patient/appointments",
      method: "POST",
      body: {
        providerId,
        providerName,
        patientName: curName,
        time: time.getTime(),
      },
    });
    toast.dark("Appointment created successfully ");
  } catch (err) {
    console.log("Failed to create appointment, ", err);
    toast.dark("Failed to create appointment, ", err);
  }
};

export const getAppointments = async () => {
  try {
    const data = await requestWithToken({
      url: "/patient/appointments",
      method: "GET",
    });
    if (!data) return;
    const events = data.events.map((event) => {
      return {
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      };
    });
    return events;
  } catch (err) {
    console.log("Failed to get appointments", err);
  }
};

export const cancelAppointment = async (apptId) => {
  try {
    await requestWithToken({
      url: "/patient/appointments",
      method: "DELETE",
      body: { appointmentId: apptId },
    });
    toast("Appointment deleted successfully ");
  } catch (err) {
    console.log("Failed to cancel appointment, ", err);
    toast("Failed to cancel appointment, ", err);
  }
};

export const addTimeSlots = async (props) => {
  try {
    await requestWithToken({
      url: "provider/opentimeslots",
      method: "POST",
      body: props.timeSlots,
    });
    toast("Timeslots added successfully ");
  } catch (err) {
    console.log("Failed to add timeslots, ", err);
    toast("Failed to add timeslots, ", err);
  }
};
