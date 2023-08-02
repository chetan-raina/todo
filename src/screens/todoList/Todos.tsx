import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Priority, type Task } from "./TodosTypes";
import TaskForm from "./TaskForm";
import TodoList from "./TodoList";
import { getTasks, saveTasks } from "../../Utils";

const initTask: Task = {
  id: "",
  title: "",
  description: "",
  priority: Priority.LOW,
  isCompleted: false,
};

const Todos = () => {
  const [currentTask, setCurrentTask] = useState<Task>(initTask);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleTaskChange = (task: Task) => {
    setCurrentTask(task);
  };

  const handleTaskSave = () => {
    if (currentTask.id === "") {
      const tempTasks = [
        ...tasks,
        {
          ...currentTask,
          id: uuidv4(), // assign an id
          title: currentTask.title.trim(), // trim extra whitespaces
          description: currentTask.description.trim(),
        },
      ];
      setTasks(tempTasks);
      saveTasks(tempTasks);
    } else {
      // if edit
      const tempTasks = [...tasks];
      const currentTaskIndex = tempTasks.findIndex(
        (task) => task.id === currentTask.id
      );
      tempTasks[currentTaskIndex] = currentTask;

      setTasks(tempTasks);
      saveTasks(tempTasks);
    }

    // reset current task
    setCurrentTask(initTask);
  };

  const handleTaskComplete = (completedTask: Task) => {
    const tempTasks = [...tasks];
    const completedTaskIndex = tempTasks.findIndex(
      (task) => task.id === completedTask.id
    );
    tempTasks[completedTaskIndex].isCompleted =
      !tempTasks[completedTaskIndex].isCompleted;

    setTasks(tempTasks);
    saveTasks(tempTasks);
  };

  const handleTaskEdit = (task: Task) => {
    setCurrentTask(task);
  };

  const handleTaskRemove = (removedTask: Task) => {
    const removedTaskIndex = tasks.findIndex(
      (task) => task.id === removedTask.id
    );
    const tempTasks = tasks.splice(removedTaskIndex, 1);
    setTasks(tempTasks);
    saveTasks(tempTasks);
  };

  return (
    <div>
      <TaskForm
        currentTask={currentTask}
        onTaskChange={handleTaskChange}
        onTaskSave={handleTaskSave}
      />
      <TodoList
        tasks={tasks}
        onTaskComplete={handleTaskComplete}
        onTaskEdit={handleTaskEdit}
        onTaskRemove={handleTaskRemove}
      />
    </div>
  );
};

export default Todos;
