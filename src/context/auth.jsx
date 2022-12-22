import React from 'react';
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getToken, setIntendedUrl, setToken } from "../utils/auth";

const AuthContext = createContext();

function AuthProvider({ children }) {
  let { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  // console.log("isAuthenticated in auth :>> ", isAuthenticated);
  const [currentUser, setCurrentUser] = useState(isAuthenticated);
  // console.log("currentUser in auth :>> ", currentUser);
  const authenticated = useMemo(() => !!currentUser, [currentUser]);

  const userData = () => {
    const access_token = getToken();
    // console.log('asdddddddd',access_token);
    return getToken()
      ? axios.get("/profile/view", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
      : Promise.resolve(null);
  };

  useEffect(() => {
    userData()
      .then((user) => {
        // console.log(`user>>>INIT:`, user)
        setCurrentUser(user);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setToken("");
        setIntendedUrl("/");
      });
  }, [authenticated]);

  return (
    <AuthContext.Provider
      value={{ loading, authenticated, currentUser, setToken, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
}

export { AuthProvider, useAuth };
