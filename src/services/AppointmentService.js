import { db } from "./Firebase/firebase";
import firebase from "firebase/app";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

export const createAppointment = async ({
  provider,
  curUid,
  curName,
  time,
}) => {
  const appointmentsRef = db.collection("appointments");
  const providerRef = db.collection("providers").doc(provider._id);
  const timeStamp = time.getTime();
  const data = {
    providerId: provider._id,
    providerName: provider.name,
    curUid,
    curName,
    timeStamp,
  };

  //   Not optimized: may have issue with concurrent operations
  console.log({ timeStamp });

  try {
    await appointmentsRef.add(data);
    const result = await providerRef.update(
      {
        availableTimeSlots: firebase.firestore.FieldValue.arrayRemove(
          timeStamp
        ),
      },
      (error) => {
        console.log(error);
      }
    );
    console.log({ result });
    console.log(`appoinment added`);
  } catch (err) {
    console.log("Failed to create appointment, ", err);
    toast("Failed to create appointment, ", err);
  }
};

export const cancelAppointment = async (apptId) => {
  const appointmentRef = db.collection("appointments").doc(apptId);

  try {
    const appt = await appointmentRef.get();
    if (appt.exists) {
      const providerId = appt.data().providerId;
      const timeStamp = new Date(appt.data().timeStamp);
      await addTimeSlot({ curUid: providerId, time: timeStamp });
      await appointmentRef.delete();
    } else {
      throw new Error("Appointment doesn't exist");
    }
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

export const addTimeSlot = async (props) => {
  const curUid = props.curUid;
  const providerRef = db.collection("providers").doc(curUid);
  const timeStamp = props.time.getTime();
  try {
    const result = await providerRef.update(
      {
        availableTimeSlots: firebase.firestore.FieldValue.arrayUnion(timeStamp),
      },
      (error) => {
        console.log(error);
      }
    );
    console.log({ timeStamp, result });
    console.log(`timeslot added`);
  } catch (err) {
    console.log("Failed to add timeslot, ", err);
    toast("Failed to add timeslot, ", err);
  }
};

// Helper

export const addRandomTimeSlot = async (props) => {
  const curUid = "1FWDmDooZjdQh1RKojp1e8MOCq82";
  const providerRef = db.collection("providers").doc(curUid);
  const timeStamp = new Date(
    "2021",
    "02",
    _.random(1, 30).toString(),
    _.random(0, 24).toString()
  ).getTime();
  try {
    const result = await providerRef.update(
      {
        availableTimeSlots: firebase.firestore.FieldValue.arrayUnion(timeStamp),
      },
      (error) => {
        console.log(error);
      }
    );
    console.log({ timeStamp, result });
    console.log(`timeslot added`);
  } catch (err) {
    console.log("Failed to add timeslot, ", err);
    toast("Failed to add timeslot, ", err);
  }
};
