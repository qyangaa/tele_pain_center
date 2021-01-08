import React from "react";

import { useAuth } from "../contexts/AuthContext";

const user = {
  currentUser: null,
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
