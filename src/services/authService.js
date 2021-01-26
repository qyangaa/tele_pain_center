import React from "react";
import firebase from "firebase/app";

import { useAuth } from "../contexts/AuthContext";

const user = {
  currentUser: null,
};

export const createNewUser = async ({ email, password, username }) => {
  await firebase.createUser({ email, password }, { username, email });
  await login({ email, password });
};

export const login = async ({ email, password }) => {
  //  TODO: check whether logout without cur user is a problem
  logout();
  await firebase.login({
    email,
    password,
  });
};

export const logout = async () => {
  await firebase.logout();
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
