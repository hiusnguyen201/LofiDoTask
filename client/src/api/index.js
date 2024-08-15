import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api/v1",
  // withCredentials: true,
});

export const apiInstance = API;

apiInstance.interceptors.request.use((req) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

// ----------------------Auth--------------------------------------
export const register = (data) => API.post("/auth/register", data);
export const login = (account, password) =>
  API.post("/auth/login", {
    account,
    password,
  });
export const logout = (data) => API.post("/auth/logout", data);

// ----------------------Account--------------------------------------
export const getAccountInfo = () => API.get("/account/info");

// ----------------------Board--------------------------------------
export const getBoards = () => API.get("/boards?sortBy=starred");
export const createBoard = (data) => API.post("/boards", data);
export const getBoard = (identify) => API.get(`/boards/${identify}`);
export const updateBoard = (identify, data) =>
  API.patch(`/boards/${identify}`, data);
export const toggleStarBoard = (identify) =>
  API.patch(`/boards/${identify}/star`);
