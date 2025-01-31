import { createContext, useContext, useEffect, useState } from "react";
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  deleteAccount,
} from "./../services/authService";
import { getInitials } from "./../utils/stringUtils";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      fetchUser();
    } else {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  }, [token]);

  // Fetch user
  const fetchUser = async () => {
    if (!token) return;
    try {
      const { user } = await getProfile();
      setUser(user);
    } catch (error) {
      throw new Error(error.message || "Failed to fetch user");
    }
  };

  // Register user
  const registerUser = async (userData) => {
    try {
      const { message, token, user } = await register(userData);
      setUser(user);
      setToken(token);
      return message;
    } catch (error) {
      throw new Error(error.message || "Registration failed");
    }
  };

  // Login user
  const loginUser = async (credentials) => {
    try {
      const { message, token, user } = await login(credentials);
      setUser(user);
      setToken(token);
      return message;
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  };

  // Logout user
  const logoutUser = async () => {
    try {
      await logout();
    } finally {
      setUser(null);
      setToken(null);
    }
  };

  // Update user
  const updateUser = async (userData) => {
    try {
      const { message, user } = await updateProfile(userData);
      setUser(user);
      return message;
    } catch (error) {
      throw new Error(error.message || "Update failed");
    }
  };

  // Delete user
  const deleteUser = async () => {
    try {
      await deleteAccount();
      setUser(null);
      setToken(null);
    } catch (error) {
      throw new Error(error.message || "Failed to delete account");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        registerUser,
        loginUser,
        logoutUser,
        fetchUser,
        updateUser,
        deleteUser,
        getInitials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
