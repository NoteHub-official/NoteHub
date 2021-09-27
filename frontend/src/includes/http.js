import axios from "axios";
import Cookies from "js-cookie";

const http = axios.create({
  baseURL: "http://localhost:8001/api/",
  headers: {
    "Content-type": "application/json",
    "CSRF-Token": Cookies.get("XSRF-TOKEN"),
  },
});

export default http;
