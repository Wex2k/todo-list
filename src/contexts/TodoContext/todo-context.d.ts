import { ITodo, Priority } from "@/components/types/todo";
import { FormEvent } from "react";

/**
 * This interface defines the structure of the todo context, including the todos array,
 * input string, loaded state, and various methods for managing todos.
 *
 * @property {ITodo[]} todos - An array of todo items.
 * @property {string} input - The current input value for adding a new todo.
 * @property {boolean} loaded - A boolean indicating if the todos have been loaded.
 * @property {function} setTodos - A function to set the todos array.
 * @property {function} setInput - A function to set the input value.
 * @property {function} handleDelete - A function to delete a todo by its ID.
 * @property {function} handleEdit - A function to edit a todo by its ID, content, and optional priority.
 * @property {function} handleSubmit - A function to handle the form submission for adding a new todo.
 * @property {function} handleClear - A function to clear all todos.
 * @property {function} handleSortTodos - A function to sort the todos by priority.
 */
export interface ITodoContext {
  todos: ITodo[];
  input: string;
  loaded: boolean;
  setTodos: (value: ITodo[]) => void;
  setInput: (value: string) => void;
  handleDelete: (id: number) => void;
  handleEdit: (id: number, content: string, priority?: Priority) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleClear: () => void;
  handleSortTodos: () => void;
}
