import { render, screen } from "@testing-library/react";
import TaskList from "../TaskList";
import type { Task } from "../../utils/types";
import * as storageUtils from "../../utils/storage";

// Mock the storage utility functions
jest.mock("../../utils/storage", () => ({
  getTasks: jest.fn(),
  setTasks: jest.fn(),
}));

describe("TaskList Component", () => {
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      dueDate: "2023-12-01",
      priority: "High",
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      dueDate: "2023-12-02",
      priority: "Medium",
      completed: true,
      createdAt: new Date().toISOString(),
    },
  ];

  const mockDeleteTask = jest.fn();
  const mockUpdateTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders empty state when no tasks are provided", () => {
    render(
      <TaskList
        tasks={[]}
        onDeleteTask={mockDeleteTask}
        onUpdateTask={mockUpdateTask}
      />
    );

    expect(screen.getByText(/no tasks found/i)).toBeInTheDocument();
  });

  test("renders tasks correctly", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onDeleteTask={mockDeleteTask}
        onUpdateTask={mockUpdateTask}
      />
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
  });

  test("loads tasks from localStorage on mount", () => {
    (storageUtils.getTasks as jest.Mock).mockReturnValue(mockTasks);

    render(
      <TaskList
        tasks={[]}
        onDeleteTask={mockDeleteTask}
        onUpdateTask={mockUpdateTask}
      />
    );

    expect(storageUtils.getTasks).toHaveBeenCalledTimes(1);
  });

  test("updates localStorage when tasks change", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onDeleteTask={mockDeleteTask}
        onUpdateTask={mockUpdateTask}
      />
    );

    expect(storageUtils.setTasks).toHaveBeenCalledWith(mockTasks);
  });
});
