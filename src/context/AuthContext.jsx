import { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth } from "../utils/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const logIn = async (email, password) => {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const logOut = () => {
    signOut(firebaseAuth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
