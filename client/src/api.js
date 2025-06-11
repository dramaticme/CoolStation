// src/api.js
import axios from "axios";

//const API_BASE_URL = "https://coolstation-backend.onrender.com/api";
const BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Optional: if you're using cookies/sessions
});

export default api;
