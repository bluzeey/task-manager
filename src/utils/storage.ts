import type { Task } from "./types";

const STORAGE_KEY = "tasks";

// Generate a unique ID for new tasks
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get all tasks from localStorage
export const getTasks = (): Task[] => {
  const tasksJson = localStorage.getItem(STORAGE_KEY);
  if (!tasksJson) return [];

  try {
    return JSON.parse(tasksJson);
  } catch (error) {
    console.error("Error parsing tasks from localStorage:", error);
    return [];
  }
};

// Save tasks to localStorage
export const setTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
};

// Add a single task to localStorage
export const addTask = (task: Task): void => {
  const tasks = getTasks();
  tasks.push(task);
  setTasks(tasks);
};

// Remove a task from localStorage
export const removeTask = (id: string): void => {
  const tasks = getTasks();
  const updatedTasks = tasks.filter((task) => task.id !== id);
  setTasks(updatedTasks);
};

// Update a task in localStorage
export const updateTask = (updatedTask: Task): void => {
  const tasks = getTasks();
  const updatedTasks = tasks.map((task) =>
    task.id === updatedTask.id ? updatedTask : task
  );
  setTasks(updatedTasks);
};
