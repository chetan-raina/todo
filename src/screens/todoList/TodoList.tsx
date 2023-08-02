import { useState } from "react";
import { CompletionFilter, SortOrder, type Task } from "./TodosTypes";

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
      <div>
        <select value={completionFilter.name} onChange={handleFilterChange}>
          {CompletionFilter.values().map((filter) => (
            <option value={filter.name}>{filter.label}</option>
          ))}
        </select>
        <select value={sortOrder.name} onChange={handleSortOrderChange}>
          {SortOrder.values().map((sortOrder) => (
            <option value={sortOrder.name}>{sortOrder.label}</option>
          ))}
        </select>
      </div>
      {tasksToDisplay.length === 0
        ? "No tasks to show"
        : tasksToDisplay.map((task) => (
            <div>
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => {
                  onTaskComplete(task);
                }}
              />
              <div>{task.isCompleted ? <s>{task.title}</s> : task.title}</div>
              <div>{task.description}</div>
              <div>{task.priority.label}</div>
              <div
                onClick={() => {
                  onTaskEdit(task);
                }}
              >
                Edit
              </div>
              <div
                onClick={() => {
                  onTaskRemove(task);
                }}
              >
                Remove
              </div>
            </div>
          ))}
    </div>
  );
};

export default TodoList;
