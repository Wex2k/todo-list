/**
 * Represents a todo item.
 */
export interface ITodo {
  content: string;
  id: number;
  editing: boolean;
  priority: Priority;
}

/**
 * Represents a priority level for a todo.
 */
export type Priority = "low" | "medium" | "high";
