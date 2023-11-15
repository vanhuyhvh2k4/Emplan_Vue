import axios from "axios";
const BASE_URL = process.env.VUE_APP_API_URL;

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default request;
