import axios from "axios";

const httpRequest = axios.create({
  baseURL: process.env.API_URL,
});

export const get = async (endpoint, options = {}) => {
  const response = await httpRequest.get(endpoint, options);
  return response;
};

export default httpRequest;
