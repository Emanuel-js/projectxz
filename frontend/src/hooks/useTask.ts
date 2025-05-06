// src/hooks/useUsers.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { taskApi } from "../services/api/taskApi";
import { Task } from "../types/task";

export const useTask = () => {
  return useQuery<Task[]>({ queryKey: ["tasks"], queryFn: taskApi.getTasks });
};

export const useAddTask = () => {
  return useMutation({ mutationFn: taskApi.addTask });
};
