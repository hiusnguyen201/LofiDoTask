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
export const getAllBoard = (filter) => {
  let endpoint = `/account/boards`;
  if (filter) {
    endpoint += "?";
    endpoint += new URLSearchParams(filter).toString();
  }
  return API.get(endpoint);
};

// ----------------------Board--------------------------------------
export const createBoard = (data) => API.post("/boards", data);
export const getBoard = (identify) => API.get(`/boards/${identify}`);
export const updateBoard = (identify, data) =>
  API.patch(`/boards/${identify}`, data);
export const deleteBoard = (identify) => API.delete(`/boards/${identify}`);
export const toggleStarBoard = (identify) =>
  API.patch(`/boards/${identify}/star`);

//  List
export const getAllListInBoard = (identify) =>
  API.get(`/boards/${identify}/lists`);
export const createList = (data) => API.post("/lists", data);
export const updateList = (identify, data) =>
  API.post(`/lists/${identify}`, data);
export const deleteList = (identify) => API.delete(`/lists/${identify}`);
