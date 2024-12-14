"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}
interface UserContextProps {
  user: User|null;
  setUser: React.Dispatch<React.SetStateAction<User|null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }
  , [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

export default UserProvider;