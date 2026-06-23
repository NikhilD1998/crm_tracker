import { createContext, useContext, useState } from "react";

import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [loading, setLoading] = useState(false);

  const register = async (formData) => {
    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", formData);

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData) => {
    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", formData);

      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
