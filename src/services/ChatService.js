import { db } from "./Firebase/firebase";
import chatActions from "../redux/ChatActions";

export const GetUser = async (userId) => {
  const usersRef = db.collection("users");
  let data = {};
  try {
    const snapshot = await usersRef.doc(userId).get();
    data = snapshot.data();
    return data.username;
  } catch (err) {}
};

export const GetGroups = async (dispatch, userId) => {
  const groupsRef = db.collection("groups");
  let groups = {};

  try {
    const groupsSnapShot = await groupsRef
      .where("users", "array-contains-any", [userId])
      .get();
    groupsSnapShot.forEach(async (doc) => {
      const users = {};
      for (const userId of doc.data().users) {
        users[userId] = await GetUser(userId);
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

export const GetMessages = async (dispatch, groupId) => {
  var groupRef = db.collection("groups").doc(groupId).collection("messages");
  let messages = [];
  try {
    groupRef.orderBy("timestamp", "asc").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
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
