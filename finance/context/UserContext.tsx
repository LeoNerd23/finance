"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getUserById: (id: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);

      const userId = data.user._id;
      console.log('userId', userId)
      const verificationResponse = await fetch(`http://localhost:3333/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!verificationResponse.ok) {
        throw new Error("Failed to verify user status");
      }

      const verificationData = await verificationResponse.json();

      if (!verificationData.isVerified) {
        console.log('verificationData', verificationData)
        router.push("/verify");
      } else {
        setUser(data.user);
        router.push("/home");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const getUserById = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3333/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user details");

      const userData = await response.json();
      setUser(userData);

      if (!userData.isVerified) {
        router.push("/verify");
      }
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      alert("Failed to fetch user details");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, getUserById }}>
      {children}
    </UserContext.Provider>
  );
};
