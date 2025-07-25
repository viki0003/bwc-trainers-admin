import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import axiosInstance from "../Config/axios";
import { Toast } from "primereact/toast";

const LoginContext = createContext();
export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toastRef = useRef(null);

  const login = async ({ username_or_email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axiosInstance.post("/customer/login/", {
        username_or_email,
        password,
      });

      let loggedInUser = data.payload.user;
      if (loggedInUser?.user) {
        loggedInUser = { ...loggedInUser, ...loggedInUser.user };
      }

      const accessToken = data.payload.access;
      const refreshToken = data.payload.refresh;

      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail ||
        err.response?.data?.errors?.username_or_email?.[0] ||
        "Login failed";

      setError(errorMessage);
      toastRef.current?.show({
        severity: "error",
        summary: "Login Failed",
        detail: errorMessage,
        life: 4000,
      });

      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <LoginContext.Provider value={{ user, login, logout, loading, error }}>
      <Toast ref={toastRef} />
      {children}
    </LoginContext.Provider>
  );
};
