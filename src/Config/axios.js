import axios from "axios";
import BASE_API_URL from "./Config";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (
      config.data &&
      !(config.data instanceof FormData) &&
      !config.headers["Content-Type"]
    ) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post(`${BASE_API_URL}/token/refresh/`, {
        refresh: refreshToken,
      });

      const { access } = response.data;
      localStorage.setItem("accessToken", access);
      originalRequest.headers.Authorization = `Bearer ${access}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      localStorage.clear();
      if (!window.location.pathname.includes("/")) {
        window.location.href = "/";
      }
      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;
