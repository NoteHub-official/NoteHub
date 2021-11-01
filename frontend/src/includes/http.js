import axios from "axios";
import Cookies from "js-cookie";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env);

const http = axios.create({
  baseURL: process.env.VUE_APP_ROOT_URL,
  headers: {
    "Content-type": "application/json",
    "CSRF-Token": Cookies.get("XSRF-TOKEN"),
  },
});

export default http;
