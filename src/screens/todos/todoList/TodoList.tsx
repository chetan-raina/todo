import { useState } from "react";
import styles from "./TodoListStyles.module.css";
import { CompletionFilter, SortOrder, type Task } from "../TodosTypes";

interface TodoListProps {
  tasks: Task[];
  onTaskComplete: (completedTask: Task) => void;
  onTaskEdit: (task: Task) => void;
  onTaskRemove: (removedTask: Task) => void;
}

const TodoList = ({
  tasks,
  onTaskComplete,
  onTaskEdit,
  onTaskRemove,
}: TodoListProps): React.ReactElement => {
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.UNSORTED);
  const [completionFilter, setCompletionFilter] = useState<CompletionFilter>(
    CompletionFilter.ALL
  );

  let tasksToDisplay = [...tasks];

  if (completionFilter === CompletionFilter.COMPLETED) {
    tasksToDisplay = tasksToDisplay.filter((task) => task.isCompleted);
  } else if (completionFilter === CompletionFilter.PENDING) {
    tasksToDisplay = tasksToDisplay.filter((task) => !task.isCompleted);
  }

  if (sortOrder === SortOrder.LOW_TO_HIGH) {
    tasksToDisplay = tasksToDisplay.sort(
      (task1, task2) => task1.priority.value - task2.priority.value
    );
  } else if (sortOrder === SortOrder.HIGHT_TO_LOW) {
    tasksToDisplay = tasksToDisplay.sort(
      (task1, task2) => task2.priority.value - task1.priority.value
    );
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCompletionFilter(CompletionFilter.valueOf(e.target.value));
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(SortOrder.valueOf(e.target.value));
  };

  return (
    <div>
      <div className={styles.filterContainer}>
        <select
          className={styles.filter}
          value={completionFilter.name}
          onChange={handleFilterChange}
        >
          {CompletionFilter.values().map((filter) => (
            <option value={filter.name}>{filter.label}</option>
          ))}
        </select>
        <select
          className={styles.filter}
          value={sortOrder.name}
          onChange={handleSortOrderChange}
        >
          {SortOrder.values().map((sortOrder) => (
            <option value={sortOrder.name}>{sortOrder.label}</option>
          ))}
        </select>
      </div>
      {tasksToDisplay.length === 0 ? (
        <div className={styles.noTasksText}>No tasks to show</div>
      ) : (
        <div>
          <div
            className={`${styles.taskContainer} ${styles.taskHeadingContainer}`}
          >
            <span
              className={`${styles.taskCell} ${styles.actionTaskCell}`}
            ></span>
            <span className={styles.taskCell}>Title</span>
            <span
              className={`${styles.taskCell} ${styles.descriptionTaskCell}`}
            >
              Description
            </span>
            <span className={styles.taskCell}>Priority</span>
            <span
              className={`${styles.taskCell} ${styles.actionTaskCell}`}
            ></span>
            <span
              className={`${styles.taskCell} ${styles.actionTaskCell}`}
            ></span>
          </div>
          {tasksToDisplay.map((task) => (
            <div className={styles.taskContainer}>
              <div className={`${styles.taskCell} ${styles.actionTaskCell}`}>
                <input
                  className={styles.completionCheckbox}
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => {
                    onTaskComplete(task);
                  }}
                />
              </div>
              <div className={styles.taskCell}>
                {task.isCompleted ? <s>{task.title}</s> : task.title}
              </div>
              <div
                className={`${styles.taskCell} ${styles.descriptionTaskCell}`}
              >
                {task.description}
              </div>
              <div className={styles.taskCell}>{task.priority.label}</div>
              <div
                className={`${styles.taskCell} ${styles.actionTaskCell}`}
                onClick={() => {
                  onTaskEdit(task);
                }}
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </div>
              <div
                className={`${styles.taskCell} ${styles.actionTaskCell}`}
                onClick={() => {
                  onTaskRemove(task);
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
