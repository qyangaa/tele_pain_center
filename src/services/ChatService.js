import React, { useEffect, useState } from "react";
import { db } from "./Firebase/firebase";

export const GetGroup = async (userId, setGroup) => {
  var groupsRef = db.collection("groups");
  var usersRef = db.collection("users");
  let groups = {};

  try {
    var groupsSnapShot = await groupsRef
      .where("users", "array-contains-any", [userId])
      .get();
    groupsSnapShot.forEach((doc) => {
      const users = {};
      for (const userId of doc.data().users) {
        usersRef
          .doc(userId)
          .get()
          .then((snapshot) => {
            users[userId] = snapshot.data();
          });
      }

      const curObject = { users: users };
      curObject._id = doc.id;
      groups[doc.id] = curObject;
      setGroup(groups);
    });
  } catch (err) {
    console.log("Group not retrieved:", err);
  }
};

export const GetMessages = async (groupId, setMessages) => {
  var groupRef = db.collection("groups").doc(groupId).collection("messages");
  let messages = [];

  try {
    var groupSnapShot = await groupRef
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          const curObject = doc.data();
          curObject._id = doc.id;
          messages.push(curObject);
          setMessages(messages);
        });
      });
  } catch (err) {
    console.log("Group not retrieved:", err);
  }
};
