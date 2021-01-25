import React from "react";
import firebase from "firebase/app";

import { useAuth } from "../contexts/AuthContext";

const user = {
  currentUser: null,
};

export const createNewUser = async ({ email, password, username }) => {
  await firebase.createUser({ email, password }, { username, email });
};

export function GetCurrentUser() {
  console.log("useAuth:", useAuth);
  const { currentUser } = useAuth();
  user = { user: currentUser };
}

export default {
  GetCurrentUser,
  user,
};
