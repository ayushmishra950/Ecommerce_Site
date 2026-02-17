import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: baseURL, // apna backend url
  withCredentials: true, // 🔥 cookie ke liye important
});

// 🔹 Request Interceptor (Access token attach karega)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔹 Response Interceptor (Auto Refresh Token)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Use axios directly to avoid interceptor loop
        const res = await axios.post(
          `${baseURL}/api/admin/auth/refreshToken`,
          {},
          { withCredentials: true }
        );
    console.log(res)
        if (res.status === 200) {
          const newAccessToken = res.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    
          // Retry original request
          return api(originalRequest);
        } else {
          // Refresh token expired / invalid
          throw new Error("Refresh token expired");
        }
      } catch (err) {
        // 🔥 Only redirect if refresh token is truly invalid
        localStorage.removeItem("accessToken");
        console.log("Refresh token failed, redirecting to login");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
