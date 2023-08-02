import styles from "./TaskFormStyles.module.css";
import { Priority, type Task } from "../TodosTypes";

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

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
    <div className={styles.formContainer}>
      <div className={styles.formItem}>
        <input
          className={styles.formInput}
          placeholder="Title"
          value={currentTask.title}
          onChange={handleTitleChange}
        />
      </div>
      <div className={styles.formItem}>
        <textarea
          className={styles.formInput}
          placeholder="Description"
          rows={3}
          value={currentTask.description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className={styles.formItem}>
        <select
          className={styles.formInput}
          value={currentTask.priority.name}
          onChange={handlePriorityChange}
        >
          {Priority.values().map((priority) => (
            <option value={priority.name}>{priority.label}</option>
          ))}
        </select>
      </div>
      <div className={styles.formItem}>
        <button
          className={styles.submitBtn}
          disabled={isSaveDisabled}
          onClick={() => onTaskSave()}
        >
          {currentTask.id === "" ? "Add Task" : "Save Task"}
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
