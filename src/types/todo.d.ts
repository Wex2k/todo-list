/**
 * Represents a todo item.
 */
interface Todo {
  content: string;
  id: number;
  complete: boolean;
}

/**
 * Represents a todo list.
 */
interface TodoList {
  todos: ITodo[];
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
}
