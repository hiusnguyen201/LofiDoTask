import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api/v1",
  // withCredentials: true,
});

export const apiInstance = API;

// ----------------------Auth--------------------------------------
export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const logout = (data) => API.post("/auth/logout", data);
