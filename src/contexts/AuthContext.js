import React, { useContext, useState, useEffect } from "react";
import { auth } from "../services/Firebase/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    // line to change if change authentication method
    auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    // line to change if change authentication method
    auth.signInWithEmailAndPassword(email, password);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false); // do not render until have set current user
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
