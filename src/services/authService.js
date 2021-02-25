import React from "react";
import firebase from "firebase/app";
import { db } from "./Firebase/firebase";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const user = {
  currentUser: null,
};

export const createNewUser = async ({ email, password, username }) => {
  const usersRef = db.collection("users");
  let uid = "";

  try {
    await firebase
      .createUser({ email, password }, { username, email })
      .then(function (data) {
        uid = data.user.uid;
        usersRef.doc(data.user.uid).set({
          username: username,
        });
      })
      .catch(function (err) {
        console.log("Failed to create user, ", err);
        toast("Failed to create user, ", err);
      });
    await login({ email, password });
  } catch (err) {
    console.log("Failed to create user, ", err);
    toast("Failed to create user, ", err);
  }
  return uid;
};

export const createProvider = async ({
  email,
  name,
  password,
  address1,
  address2,
  city,
  state,
  zip,
  organization,
  description,
  phone,
  specialty,
  image,
}) => {
  const providersRef = db.collection("providers");

  const uid = await createNewUser({
    email: email,
    password: password,
    username: name,
  });

  const providerData = {
    uid,
    email,
    name,
    address1,
    address2,
    city,
    state,
    zip,
    organization,
    description,
    phone,
    specialty,
    image,
  };

  try {
    providersRef.doc(uid).set(providerData);
  } catch (err) {
    console.log("Failed to create provider, ", err);
    toast.log("Failed to create provider, ", err);
  }
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
