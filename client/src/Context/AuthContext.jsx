/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
'use client'
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => { 
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(localStorage.getItem("app-user"));
      setAuthUser(storedUser || null);
    }
  }, []); // Run only once on component mount

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};
