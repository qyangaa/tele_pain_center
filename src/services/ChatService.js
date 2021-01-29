import { db } from "./Firebase/firebase";
import chatActions from "../redux/ChatActions";
import firebase from "firebase/app";

export const GetUser = async (uid) => {
  const usersRef = db.collection("users");
  let data = {};
  try {
    const snapshot = await usersRef.doc(uid).get();
    data = snapshot.data();
    return data.username;
  } catch (err) {}
};

export const GetGroups = async (dispatch, uid) => {
  const groupsRef = db.collection("groups");
  let groups = {};

  console.log({ uid });
  try {
    const groupsSnapShot = await groupsRef
      .where("users", "array-contains-any", [uid])
      .orderBy("timestamp", "desc")
      .get();
    groupsSnapShot.forEach(async (doc) => {
      const users = {};
      for (const uid of doc.data().users) {
        users[uid] = await GetUser(uid);
      }
      groups[doc.id] = { users, _id: doc.id, data: doc.data() };
      chatActions.fetchGroups(dispatch, groups);
    });
  } catch (err) {
    console.log("Group not retrieved:", err);
  }

  return groups;
};

export const SetCurGroup = (dispatch, curGroupId) => {
  chatActions.fetchCurGroup(dispatch, curGroupId);
  var groupRef = db.collection("groups").doc(curGroupId);
  try {
    groupRef.update({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (err) {
    console.log("failed to set curGroup on server, ", err);
  }
};

export const CreateGroup = async (dispatch, uid1, uid2) => {
  const groupsRef = db.collection("groups");
  try {
    const group = {
      users: [uid1, uid2],
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const groupRef = await groupsRef.add(group);
    chatActions.fetchCurGroup(dispatch, groupRef.id);
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
