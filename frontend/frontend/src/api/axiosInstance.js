import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sfs-backend-nt54.onrender.com/api", // ✅ Render backend URL
  withCredentials: true, // if backend uses cookies
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // JWT from login
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
