import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/";

const PublicApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export default PublicApi;

export const PrivateApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
