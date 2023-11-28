import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = process.env.VUE_APP_API_URL;

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use((config) => {
  let token = Cookies.get("gid");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default request;