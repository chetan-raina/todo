import { Task } from "./screens/todos/TodosTypes";

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const getTasks = (): Task[] => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};
