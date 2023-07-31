import { useState } from "react";
import { type Task } from "./TodosTypes";
import TaskForm from "./TaskForm";
import TodoList from "./TodoList";

const initTask: Task = {
  title: "",
  description: "",
};

const Todos = () => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(-1);
  const [currentTask, setCurrentTask] = useState<Task>(initTask);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTaskChange = (task: Task) => {
    setCurrentTask(task);
  };

  const handleTaskSave = () => {
    if (currentTaskIndex > -1) {
      // if edit
      tasks[currentTaskIndex] = currentTask;
    } else {
      setTasks((tasks) => [...tasks, currentTask]);
    }

    // reset current task
    setCurrentTaskIndex(-1);
    setCurrentTask(initTask);
  };

  const handleTaskEdit = (task: Task, taskIndex: number) => {
    setCurrentTaskIndex(taskIndex);
    setCurrentTask(task);
  };

  const handleTaskRemove = (taskIndex: number) => {
    setTasks((tasks) => tasks.splice(taskIndex, 1));
  };

  return (
    <div>
      <TaskForm
        currentTaskIndex={currentTaskIndex}
        currentTask={currentTask}
        onTaskChange={handleTaskChange}
        onTaskSave={handleTaskSave}
      />
      <TodoList
        tasks={tasks}
        onTaskEdit={handleTaskEdit}
        onTaskRemove={handleTaskRemove}
      />
    </div>
  );
};

export default Todos;
