"use client";

import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskSearch from "./TaskSearch";
import Filter from "./Filter";
import { Task } from "../utils/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Dashboard = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  // Add this effect to save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task: Task) => task.id !== id));
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task: Task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const filteredTasks = tasks
    .filter(
      (task: { title: string; description: string }) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((task: { priority: string }) =>
      priorityFilter ? task.priority === priorityFilter : true
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Task Management Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <TaskSearch onSearch={setSearchQuery} />
        </div>
        <div>
          <Filter
            onFilterChange={setPriorityFilter}
            currentFilter={priorityFilter}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <TaskForm onAddTask={addTask} />
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
          <TaskList
            tasks={filteredTasks}
            onDeleteTask={deleteTask}
            onUpdateTask={updateTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
