/**
 * Task interface
 */
export interface Task {
  id: string;
  title: string;
}

/**
 * Task response from the API
 */
export interface TasksResponse {
  tasks: Task[];
  count: number;
  timestamp: string;
}

/**
 * Single task response from the API
 */
export interface TaskResponse {
  task: Task;
  message: string;
  timestamp: string;
}

/**
 * Delete task response from the API
 */
export interface DeleteTaskResponse {
  message: string;
  timestamp: string;
}
