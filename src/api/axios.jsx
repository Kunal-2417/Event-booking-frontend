import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/auth",  // ✅ Backend Django URL
  withCredentials: true,                 // ✅ Important for HttpOnly cookie!
});

export default api;
