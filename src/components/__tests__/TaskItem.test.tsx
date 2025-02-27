import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../TaskItem";
import type { Task } from "../../utils/types";

describe("TaskItem Component", () => {
  const mockTask: Task = {
    id: "123",
    title: "Test Task",
    description: "Test Description",
    dueDate: "2023-12-31",
    priority: "High",
    completed: false,
    createdAt: new Date().toISOString(),
  };

  const mockDelete = jest.fn();
  const mockUpdate = jest.fn();

  beforeEach(() => {
    mockDelete.mockClear();
    mockUpdate.mockClear();
  });

  test("renders task details correctly", () => {
    render(
      <TaskItem task={mockTask} onDelete={mockDelete} onUpdate={mockUpdate} />
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText(/due:/i)).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  test("toggles task completion status", () => {
    render(
      <TaskItem task={mockTask} onDelete={mockDelete} onUpdate={mockUpdate} />
    );

    // Find and click the checkbox
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    // Check if onUpdate was called with updated task
    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(mockUpdate).toHaveBeenCalledWith({
      ...mockTask,
      completed: true,
    });
  });

  test("deletes task when delete button is clicked", () => {
    render(
      <TaskItem task={mockTask} onDelete={mockDelete} onUpdate={mockUpdate} />
    );

    // Find and click the delete button
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    // Check if onDelete was called with task id
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith("123");
  });

  test("enters edit mode when edit button is clicked", () => {
    render(
      <TaskItem task={mockTask} onDelete={mockDelete} onUpdate={mockUpdate} />
    );

    // Find and click the edit button
    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    // Check if form inputs are displayed
    expect(screen.getByDisplayValue("Test Task")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Description")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2023-12-31")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  test("updates task when save button is clicked in edit mode", () => {
    render(
      <TaskItem task={mockTask} onDelete={mockDelete} onUpdate={mockUpdate} />
    );

    // Enter edit mode
    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    // Update form fields
    fireEvent.change(screen.getByDisplayValue("Test Task"), {
      target: { value: "Updated Task" },
    });
    fireEvent.change(screen.getByDisplayValue("Test Description"), {
      target: { value: "Updated Description" },
    });

    // Save changes
    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    // Check if onUpdate was called with updated task
    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "123",
        title: "Updated Task",
        description: "Updated Description",
      })
    );
  });

  test("cancels edit mode without saving changes", () => {
    render(
      <TaskItem task={mockTask} onDelete={mockDelete} onUpdate={mockUpdate} />
    );

    // Enter edit mode
    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    // Update form fields
    fireEvent.change(screen.getByDisplayValue("Test Task"), {
      target: { value: "Updated Task" },
    });

    // Cancel edit
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    // Check if we're back to view mode with original data
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(mockUpdate).not.toHaveBeenCalled();
  });
});
