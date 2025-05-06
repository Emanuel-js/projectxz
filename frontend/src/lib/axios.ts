import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Default config
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false, // Must be false to work with CORS '*' origin
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // 10 seconds timeout
  // Disable XSRF for this simple example
  xsrfCookieName: "",
  xsrfHeaderName: "",
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // No token needed for this simple test
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const { response } = error;

    // Log all errors
    console.error("API Error:", {
      status: response?.status,
      statusText: response?.statusText,
      data: response?.data,
      url: error.config?.url,
    });

    return Promise.reject(error);
  }
);

export const api = {
  get: <T>(url: string, config = {}) =>
    axiosInstance.get<T>(url, config).then((response) => response.data),

  post: <T>(url: string, data = {}, config = {}) =>
    axiosInstance.post<T>(url, data, config).then((response) => response.data),

  put: <T>(url: string, data = {}, config = {}) =>
    axiosInstance.put<T>(url, data, config).then((response) => response.data),

  patch: <T>(url: string, data = {}, config = {}) =>
    axiosInstance.patch<T>(url, data, config).then((response) => response.data),

  delete: <T>(url: string, config = {}) =>
    axiosInstance.delete<T>(url, config).then((response) => response.data),
};
