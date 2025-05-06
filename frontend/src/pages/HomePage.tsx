import { useState } from "react";
import { useAddTask, useDeleteTask, useTask } from "../hooks/useTask";
import { useQueryClient } from "@tanstack/react-query";

const TaskInput = ({
  onSave,
  isLoading,
}: {
  onSave: (title: string) => void;
  isLoading: boolean;
}) => {
  const [title, setTitle] = useState("");

  const handleSave = () => {
    if (title.trim()) {
      onSave(title);
      setTitle("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-4 py-2 w-full mb-4"
        placeholder="Enter title"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

const TaskList = ({
  tasks,
  isLoading,
  onDelete,
}: {
  tasks: { _id: string; title: string }[] | undefined;
  isLoading: boolean;
  onDelete: (id: string) => void;
}) => {
  if (isLoading) return <p>Loading...</p>;

  return (
    <ul>
      {tasks?.map((task) => (
        <div key={task._id}>
          <li className="border-b py-2">{task.title}</li>
          <button
            onClick={() => onDelete(task._id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </ul>
  );
};

const HomePage = () => {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading: isTasksLoading } = useTask();
  const addTaskMutation = useAddTask();
  const deleteTaskMutation = useDeleteTask();

  const handleSave = (title: string) => {
    addTaskMutation.mutate(title, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
    });
  };

  const handleDelete = (id: string) => {
    deleteTaskMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
    });
  };

  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Setup project</h1>
        </div>
        <TaskInput
          onSave={handleSave}
          isLoading={addTaskMutation.status === "pending"}
        />
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Saved Titles</h2>
          <TaskList
            tasks={tasks}
            isLoading={isTasksLoading}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
