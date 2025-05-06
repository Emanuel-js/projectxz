import { api } from "../../lib/axios";
import { User } from "../../store/authStore";
import { Task } from "../../types/task";

export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ user: User; token: string }>("/auth/login", { email, password }),

  register: (userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => api.post<{ user: User; token: string }>("/auth/register", userData),

  logout: () => api.post("/auth/logout"),

  me: () => api.get<User>("/auth/me"),
};

export const userApi = {
  getProfile: () => api.get<User>("/user/profile"),

  updateProfile: (data: Partial<User>) => api.put<User>("/user/profile", data),

  changePassword: (data: {
    current_password: string;
    password: string;
    password_confirmation: string;
  }) => api.put("/user/password", data),
};

export const taskApi = {
  getTasks: () => api.get<Task[]>("/task"),
  addTask: (title: string) =>
    api.post<Task>("/task", { title }).then((res) => res),
  deleteTask: (id: string) => api.delete(`/task/${id}`),
};
