import axios from "axios";

// If we are in "production" (live on the web), use the real URL.
// Otherwise, use localhost.
const API_URL = "http://localhost:8080/api"; 
// Note: Once you deploy the backend, you will come back here and paste the new URL!

const api = axios.create({
  baseURL: API_URL,
});

// Automatically add the Token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;