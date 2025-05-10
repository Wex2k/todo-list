/**
 * This interface defines the structure of a todo item, including its content, ID, editing state, and priority level.
 *
 * @property {string} content - The content of the todo item.
 * @property {number} id - The unique identifier for the todo item.
 * @property {boolean} editing - A boolean indicating if the todo item is currently being edited.
 * @property {Priority} priority - The priority level of the todo item, which can be "low", "medium", or "high".
 */
export interface ITodo {
  content: string;
  id: number;
  editing: boolean;
  priority: Priority;
}

/**
 * This type defines the possible priority levels for a todo item.
 * It can be "low", "medium", or "high".
 *
 * @type Priority
 * @property {"low" | "medium" | "high"} - The priority level of the todo item.
 */
export type Priority = "low" | "medium" | "high";
