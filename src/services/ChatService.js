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

  console.log(uid);
  try {
    const groupsSnapShot = await groupsRef
      .where("users", "array-contains-any", [uid])
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
};

export const GetMessages = async (dispatch, groupId, limit) => {
  var groupRef = db.collection("groups").doc(groupId).collection("messages");
  let messages = [];
  try {
    groupRef
      .orderBy("timestamp", "desc")
      .limit(limit)
      .onSnapshot((snapshot) => {
        snapshot.docs.reverse().map((doc) => {
          const curObject = doc.data();
          curObject._id = doc.id;
          messages.push(curObject);
          chatActions.fetchMessages(dispatch, messages);
        });
      });
  } catch (err) {
    console.log("Message not retrieved, ", err);
  }

  return [...messages];
};

export const SendMessages = async (dispatch, groupId, uid, text) => {
  var groupRef = db.collection("groups").doc(groupId).collection("messages");
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
