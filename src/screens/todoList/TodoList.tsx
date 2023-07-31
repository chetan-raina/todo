import { type Task } from "./TodosTypes";

interface TodoListProps {
  tasks: Task[];
  onTaskEdit: (task: Task, taskIndex: number) => void;
  onTaskRemove: (taskIndex: number) => void;
}

const TodoList = ({
  tasks,
  onTaskEdit,
  onTaskRemove,
}: TodoListProps): React.ReactElement => {
  return (
    <div>
      {tasks.map((task, taskIndex) => (
        <div>
          <div>{task.title}</div>
          <div>{task.description}</div>
          <div
            onClick={() => {
              onTaskEdit(task, taskIndex);
            }}
          >
            Edit
          </div>
          <div
            onClick={() => {
              onTaskRemove(taskIndex);
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
