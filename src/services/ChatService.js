import React, { useEffect, useState } from "react";
import { db } from "./Firebase/firebase";

export const GetUser = async (userId) => {
  const usersRef = db.collection("users");
  let data = {};
  try {
    const snapshot = await usersRef.doc(userId).get();
    data = snapshot.data();
  } catch (err) {}
  return data.username;
};

export const GetGroup = async (userId, curGroupId) => {
  const groupsRef = db.collection("groups");
  const users = {};
  const curGroup = {};
  const groups = [];
  let groupsSnapShot = [];

  try {
    groupsSnapShot = await groupsRef
      .where("users", "array-contains-any", [userId])
      .get();
  } catch (err) {
    console.log("Group not retrieved:", err);
  }

  groupsSnapShot.forEach(async (doc) => {
    groups.push(doc.data());
    for (const userId of doc.data().users) {
      users[userId] = await GetUser(userId);
    }
    curGroup.users = users;
    curGroup.id = doc.id;
  });

  groups[curGroup.id] = curGroup;
  return { groups, curGroup };
};

export const GetMessages = async (groupId) => {
  var groupRef = db.collection("groups").doc(groupId).collection("messages");
  let messages = [];
  try {
    groupRef.orderBy("timestamp", "asc").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        const curObject = doc.data();
        curObject._id = doc.id;
        messages.push(curObject);
      });
    });
  } catch (err) {
    console.log("Message not retrieved, ", err);
  }

  return [...messages];
};
