import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const authorizationToken = `Bearer ${token}`;
  const [isLoading, setIsLoading] = useState(true);

  //Save the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  //Logout the user
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  //Check user logged in
  let isLoggedIn = !!token;
  let isAdmin = false;
  let CurrentUser = user.role;
  if (CurrentUser == "admin") {
    isAdmin = true;
  }

  //jWT Authenticating the LoggedIn user
  const userAuthentication = async () => {
    // console.log(`Bearer ${token}`)
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const res_data = await response.json();
        const details = res_data.userData;
        setIsLoading(false);
        setUser(details);
        CurrentUser = details.role;
        // if (details.role == "admin" || details.role == "moderator") {}
      } else {
        setIsLoading(false);
        console.log("Error fetching user data");
      }
    } catch (error) {
      console.log("User not Authenticated");
      isLoggedIn = false;
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        LogoutUser,
        isLoggedIn,
        user,
        authorizationToken,
        isLoading,
        CurrentUser,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const AuthContextValue = useContext(AuthContext);
  if (!AuthContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return AuthContextValue;
};
