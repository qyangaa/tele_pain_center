import { db } from "./Firebase/firebase";
import * as chatActions from "../redux/ChatActions";
import firebase from "firebase/app";

import { requestWithToken } from "./apiService";

export const GetGroups = async (dispatch) => {
  try {
    const data = await requestWithToken({
      url: "groups",
      method: "GET",
    });
    console.log({ data });
    chatActions.fetchGroups(dispatch, data.groups);
  } catch (err) {
    console.log("Group not retrieved:", err);
  }
};

export const SetCurGroup = async (dispatch, curGroupId) => {
  chatActions.fetchCurGroup(dispatch, curGroupId);
  try {
    const data = await requestWithToken({
      url: "groups",
      method: "PUT",
      body: JSON.stringify({ curGroupId }),
    });
  } catch (err) {
    console.log("failed to set curGroup on server, ", err);
  }
};

export const CreateGroup = async (dispatch, uid1, uid2) => {
  try {
    const data = await requestWithToken({
      url: "groups",
      method: "POST",
      body: JSON.stringify({ uid1, uid2 }),
    });
    chatActions.fetchCurGroup(dispatch, data.groupId);
  } catch (err) {
    console.log("Group not created:", err);
  }
};

export const GetMessages = async (dispatch, groupId, limit) => {
  if (!groupId) {
    chatActions.fetchMessages(dispatch, []);
    return [];
  }
  const groupRef = db.collection("groups").doc(groupId);
  const messageRef = groupRef.collection("messages");
  let messages = [];
  try {
    messageRef
      .orderBy("timestamp", "desc")
      .limit(limit)
      .onSnapshot((snapshot) => {
        messages = [];
        snapshot.docs.reverse().map((doc) => {
          const curObject = doc.data();
          curObject._id = doc.id;
          messages.push(curObject);
          chatActions.fetchMessages(dispatch, messages);
        });
      });
    groupRef.update({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (err) {
    console.log("Message not retrieved, ", err);
  }

  if (!messages.length) {
    chatActions.fetchMessages(dispatch, messages);
  }

  return [...messages];
};

export const SendMessages = async (dispatch, groupId, uid, text) => {
  const groupRef = db.collection("groups").doc(groupId).collection("messages");
  try {
    const message = {
      uid: uid,
      text: text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    groupRef.add(message);
  } catch (err) {
    console.log("Message not sent, ", err);
  }

  return;
};

// Not moving onSnapshot to cloud functions:
// https://stackoverflow.com/questions/61310444/if-i-implement-onsnapshot-real-time-listener-to-firestore-in-cloud-function-will
