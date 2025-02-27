import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "../Dashboard";
import type { Task } from "../../utils/types";

// Mock child components to simplify testing
jest.mock("../TaskForm", () => {
  return function MockTaskForm({
    onAddTask,
  }: {
    onAddTask: (task: any) => void;
  }) {
    return (
      <div data-testid="task-form">
        <button
          onClick={() =>
            onAddTask({
              id: "mock-id",
              title: "Mock Task",
              description: "Mock Description",
              dueDate: "2023-12-31",
              priority: "High",
              completed: false,
              createdAt: new Date().toISOString(),
            })
          }
        >
          Add Mock Task
        </button>
      </div>
    );
  };
});

jest.mock("../TaskList", () => {
  return function MockTaskList({
    tasks,
    onDeleteTask,
    onUpdateTask,
  }: {
    tasks: Task[];
    onDeleteTask: (id: string) => void;
    onUpdateTask: (task: Task) => void;
  }) {
    return (
      <div data-testid="task-list">
        <div>Task Count: {tasks.length}</div>
        <button onClick={() => onDeleteTask("mock-id")}>Delete Task</button>
        <button
          onClick={() =>
            onUpdateTask({
              ...tasks[0],
              completed: !tasks[0]?.completed,
            })
          }
        >
          Toggle Complete
        </button>
      </div>
    );
  };
});

jest.mock("../TaskSearch", () => {
  return function MockTaskSearch({
    onSearch,
  }: {
    onSearch: (query: string) => void;
  }) {
    return (
      <div data-testid="task-search">
        <input
          data-testid="search-input"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    );
  };
});

jest.mock("../Filter", () => {
  return function MockFilter({
    onFilterChange,
    currentFilter,
  }: {
    onFilterChange: (filter: string | null) => void;
    currentFilter: string | null;
  }) {
    return (
      <div data-testid="filter">
        <div>Current Filter: {currentFilter || "None"}</div>
        <button onClick={() => onFilterChange("High")}>Filter High</button>
        <button onClick={() => onFilterChange(null)}>Clear Filter</button>
      </div>
    );
  };
});

describe("Dashboard Component", () => {
  test("renders all child components", () => {
    render(<Dashboard />);

    expect(screen.getByText(/task management dashboard/i)).toBeInTheDocument();
    expect(screen.getByTestId("task-form")).toBeInTheDocument();
    expect(screen.getByTestId("task-list")).toBeInTheDocument();
    expect(screen.getByTestId("task-search")).toBeInTheDocument();
    expect(screen.getByTestId("filter")).toBeInTheDocument();
  });

  test("adds a task when TaskForm submits", () => {
    render(<Dashboard />);

    // Initially no tasks
    expect(screen.getByText("Task Count: 0")).toBeInTheDocument();

    // Add a task
    fireEvent.click(screen.getByText("Add Mock Task"));

    // Now we should have one task
    expect(screen.getByText("Task Count: 1")).toBeInTheDocument();
  });

  test("deletes a task", () => {
    render(<Dashboard />);

    // Add a task first
    fireEvent.click(screen.getByText("Add Mock Task"));
    expect(screen.getByText("Task Count: 1")).toBeInTheDocument();

    // Delete the task
    fireEvent.click(screen.getByText("Delete Task"));

    // Should have no tasks again
    expect(screen.getByText("Task Count: 0")).toBeInTheDocument();
  });

  test("updates a task", () => {
    render(<Dashboard />);

    // Add a task first
    fireEvent.click(screen.getByText("Add Mock Task"));

    // Toggle complete status
    fireEvent.click(screen.getByText("Toggle Complete"));

    // Task should still exist
    expect(screen.getByText("Task Count: 1")).toBeInTheDocument();
  });

  test("filters tasks by search query", () => {
    render(<Dashboard />);

    // Add a task
    fireEvent.click(screen.getByText("Add Mock Task"));

    // Enter search query that doesn't match
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "non-matching query" } });

    // No tasks should be shown
    expect(screen.getByText("Task Count: 0")).toBeInTheDocument();

    // Enter search query that matches
    fireEvent.change(searchInput, { target: { value: "Mock" } });

    // Task should be shown again
    expect(screen.getByText("Task Count: 1")).toBeInTheDocument();
  });

  test("filters tasks by priority", () => {
    render(<Dashboard />);

    // Add a task with High priority
    fireEvent.click(screen.getByText("Add Mock Task"));

    // Filter by High priority
    fireEvent.click(screen.getByText("Filter High"));

    // Task should still be shown (it has High priority)
    expect(screen.getByText("Task Count: 1")).toBeInTheDocument();

    // Clear filter
    fireEvent.click(screen.getByText("Clear Filter"));

    // Task should still be shown
    expect(screen.getByText("Task Count: 1")).toBeInTheDocument();
  });
});
