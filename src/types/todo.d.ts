/**
 * Represents a todo item.
 */
interface Todo {
  content: string;
  id: number;
  editing: boolean;
}

/**
 * Represents a todo list.
 */
interface TodoList {
  todos: Todo[];
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
}
