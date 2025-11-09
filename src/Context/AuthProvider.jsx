import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signOut, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/Firebase.config";
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({ children }) => {
    const [user, setUser]= useState(null)
    const [loading,setLoading]= useState(true)
    /* sign up user */
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  /* sign in with email password */
  const signIn = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
  }
  /* signin with google */
  const googleSignIn = ()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
  }
  /* updateUser profile */
  const updateUser = (updatedInfo)=>{
    return updateProfile(auth.currentUser,updatedInfo)
  }
  /* LogOut user */
  const LogOut =()=>{
    return signOut(auth)
  }

  /* password reset with send email */
  const resetPassword = (email)=>{
    return sendPasswordResetEmail(auth,email)
  }
  
  /* user state manage  */
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        setLoading(false)

    })
    return ()=>{
        unsubscribe()
    }
  },[])
  console.log(user)
  const authInfo = {
    createUser,
    googleSignIn,
    user,
    loading,
    signIn,
    LogOut,
    updateUser,
    resetPassword,
    setUser,
    setLoading,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
