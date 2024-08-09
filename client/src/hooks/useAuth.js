import { useState, useEffect, createContext, useContext } from "react";

import * as httpRequest from "~/utils/httpRequest";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const fetchData = async () => {
      await httpRequest.get("/users");
    };

    fetchData();
  }, []);

  return;
};
