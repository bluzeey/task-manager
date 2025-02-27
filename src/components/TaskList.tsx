import { useEffect } from "react";
import TaskItem from "./TaskItem";
import type { Task } from "../utils/types";
import { getTasks, setTasks } from "../utils/storage";

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onUpdateTask: (task: Task) => void;
}

const TaskList = ({ tasks, onDeleteTask, onUpdateTask }: TaskListProps) => {
  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = getTasks();
    if (storedTasks.length > 0) {
      // This would typically update a state in the parent component
      // For this example, we're assuming tasks are managed in the Dashboard component
    }
  }, []);

  // Update localStorage when tasks change
  useEffect(() => {
    setTasks(tasks);
  }, [tasks]);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks found. Add a new task to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDeleteTask}
          onUpdate={onUpdateTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
