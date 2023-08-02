import { Priority, type Task } from "./TodosTypes";

interface TaskFormProps {
  currentTask: Task;
  onTaskChange: (task: Task) => void;
  onTaskSave: () => void;
}

const TaskForm = ({
  currentTask,
  onTaskChange,
  onTaskSave,
}: TaskFormProps): React.ReactElement => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTaskChange({
      ...currentTask,
      title: e.target.value,
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTaskChange({
      ...currentTask,
      description: e.target.value,
    });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onTaskChange({
      ...currentTask,
      priority: Priority.valueOf(e.target.value),
    });
  };

  const isSaveDisabled = !(currentTask.title && currentTask.description);

  return (
    <div>
      <input value={currentTask.title} onChange={handleTitleChange} />
      <input
        value={currentTask.description}
        onChange={handleDescriptionChange}
      />
      <select value={currentTask.priority.name} onChange={handlePriorityChange}>
        {Priority.values().map((priority) => (
          <option value={priority.name}>{priority.label}</option>
        ))}
      </select>
      <button disabled={isSaveDisabled} onClick={() => onTaskSave()}>
        {currentTask.id === "" ? "Add Task" : "Save Task"}
      </button>
    </div>
  );
};

export default TaskForm;
