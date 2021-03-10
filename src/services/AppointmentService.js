import { db } from "./Firebase/firebase";
import firebase from "firebase/app";
import { ToastContainer, toast } from "react-toastify";

export const createAppointment = async ({ providerId, curUid, time }) => {
  const appointmentsRef = db.collection("appointments");
  const providerRef = db.collection("providers").doc(providerId);
  const timeStamp = time.getTime();
  const data = {
    providerId,
    curUid,
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
    toast.log("Failed to create appointment, ", err);
  }
};
