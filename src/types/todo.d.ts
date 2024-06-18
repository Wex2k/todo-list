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

/**
 * Represents a todo context.
 */
interface TodoContext {
  todos: Todo[];
  input: string;
  setInput: (value: string) => void;
  setTodos: (value: Todo[]) => void;
  handleDelete: (id: number) => void;
  handleEdit: (id: number, content: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleClear: () => void;
}
