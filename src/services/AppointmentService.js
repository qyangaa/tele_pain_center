import { db } from "./Firebase/firebase";
import firebase from "firebase/app";

import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

export const getMyOpenSlots = async () => {
  try {
    const token = await firebase.auth().currentUser.getIdToken();
    const res = await fetch("provider/opentimeslots", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    if (!data) return;
    const timeSlots = data.timeSlots.map((time) => new Date(time));
    return timeSlots;
  } catch (error) {
    console.log(error);
  }
};

export const removeSlots = async (timeSlots) => {
  try {
    const token = await firebase.auth().currentUser.getIdToken();
    const res = await fetch("provider/opentimeslots", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(timeSlots),
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
    const token = await firebase.auth().currentUser.getIdToken();
    console.log(time.getTime());
    const res = await fetch("patient/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        providerId,
        providerName,
        patientName: curName,
        time: time.getTime(),
      }),
    });
    console.log(res);
    const data = await res.json();
    if (res.status == 500) throw new Error(data.error);
    toast.dark("Appointment created successfully ");
  } catch (err) {
    console.log("Failed to create appointment, ", err);
    toast.dark("Failed to create appointment, ", err);
  }
};

export const cancelAppointment = async (apptId) => {
  try {
    const token = await firebase.auth().currentUser.getIdToken();
    const res = await fetch("patient/appointments", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ appointmentId: apptId }),
    });
    console.log(res);
    const data = await res.json();
    if (res.status == 500) throw new Error(data.error);
    toast("Appointment deleted successfully ");
  } catch (err) {
    console.log("Failed to cancel appointment, ", err);
    toast("Failed to cancel appointment, ", err);
  }
};

export const getUserAppointment = async (props) => {
  if (!props.curUid) return;
  const curUid = props.curUid;
  const userApptRef = db
    .collection("appointments")
    .where("curUid", "==", curUid);
  try {
    const querySnapshot = await userApptRef.get();
    const apptList = querySnapshot.docs;
    const events = apptList.map((appt) => {
      return {
        _id: appt.id,
        title: appt.data().providerName,
        start: new Date(appt.data().timeStamp),
        end: new Date(appt.data().timeStamp).addHours(1),
      };
    });
    return events;
  } catch (err) {
    console.log("Failed to retrieve appointment, ", err);
    toast("Failed to retrieve appointment, ", err);
  }
};

export const addTimeSlots = async (props) => {
  try {
    const token = await firebase.auth().currentUser.getIdToken();
    const res = await fetch("provider/opentimeslots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(props.timeSlots),
    });
    console.log(res);
    const data = await res.json();
    if (res.status == 500) throw new Error(data.error);
    toast("Timeslots added successfully ");
  } catch (err) {
    console.log("Failed to add timeslots, ", err);
    toast("Failed to add timeslots, ", err);
  }
};
