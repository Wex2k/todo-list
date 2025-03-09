import { ITodo, Priority } from "@/components/types/todo";
import { FormEvent } from "react";

/**
 * Represents a todo context.
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
