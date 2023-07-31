import { type Task } from "./TodosTypes";

interface TaskFormProps {
  currentTaskIndex: number;
  currentTask: Task;
  onTaskChange: (task: Task) => void;
  onTaskSave: () => void;
}

const TaskForm = ({
  currentTaskIndex,
  currentTask,
  onTaskChange,
  onTaskSave,
}: TaskFormProps): React.ReactElement => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTaskChange({
      ...currentTask,
      title: e.target.value.trim(),
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTaskChange({
      ...currentTask,
      description: e.target.value.trim(),
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
      <button disabled={isSaveDisabled} onClick={() => onTaskSave()}>
        {currentTaskIndex > -1 ? "Save Task" : "Add Task"}
      </button>
    </div>
  );
};

export default TaskForm;
