import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../services/Firebase/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [uid, setuid] = useState("");

  const [providers, setproviders] = useState([]);

  function signup(email, password) {
    // line to change if change authentication method
    auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    // line to change if change authentication method
    auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function getUsername(uid) {
    db.collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        setUsername(doc.data().username);
      });
    return;
  }

  function getProvider() {
    const providersRef = db.collection("providers");

    providersRef.get().then(function (querySnapshot) {
      let data = [];
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data());
      });
      setproviders(data);
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setuid(user.uid);
      getUsername(user.uid);
      setLoading(false); // do not render until have set current user
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    uid,
    username,
    getProvider,
    providers,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
