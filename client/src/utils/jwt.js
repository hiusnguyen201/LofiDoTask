import { jwtDecode } from "jwt-decode";

const isValidToken = (token) => {
  if (!token) return false;
  const decoded = jwtDecode(token);
  return decoded.exp > Date.now() / 1000;
};

const setSession = (accessToken, refreshToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

export { setSession, isValidToken };
