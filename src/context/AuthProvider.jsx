import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //login user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // google login user
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // logout user
  const logoutUser = () =>{
    signOut(auth)
  }
  //update user profile 
  const updateUserProfile = (updatedData) =>{  
    return updateProfile(auth.currentUser,updatedData)
  }
  // forget password
  const forgetPassword = (email) =>{
    return sendPasswordResetEmail(auth,email)
  }


  // user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const userInfo = {
    createUser,
    loginUser,
    googleLogin,
    user,
    setUser,
    logoutUser,
    loading,
    setLoading,
    updateUserProfile,
    forgetPassword
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
}

export default AuthProvider;