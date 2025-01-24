import { Priority, ITodo } from "@/components/types/todo";
import { ITodoContext } from "./todo-context";
import { createContext, FormEvent, useEffect, useState } from "react";

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [input, setInput] = useState("");

  const [todos, setTodos] = useState<ITodo[]>(() => {
    if (typeof window !== "undefined") {
      const savedTodos: ITodo[] = JSON.parse(
        localStorage.getItem("todos")!,
      ) as ITodo[];
      return savedTodos ?? [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id: number, content: string, priority?: Priority) => {
    // If the content is empty when edited, delete the todo
    if (!content || content.trim() === "") {
      handleDelete(id);
      return;
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              content: content,
              editing: !todo.editing,
              priority: priority ?? todo.priority,
            }
          : todo,
      ),
    );
    setInput("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input !== "") {
      setTodos([
        ...todos,
        {
          content: input,
          editing: false,
          id: Date.now(),
          priority: "low",
        },
      ]);
      setInput("");
    }
  };

  const handleClear = () => {
    if (!todos || todos.length === 0) return;
    if (
      window.confirm(
        "This action cannot be undone. Do you want to clear all todos?",
      )
    ) {
      setTodos([]);
      scrollTo(0, 0);
    }
  };

  const handleSortTodos = () => {
    const priorityOrder = {
      low: 1,
      medium: 2,
      high: 3,
    };

    setTodos((prevTodos) =>
      prevTodos.toSorted((a, b) => {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }),
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        input,
        setInput,
        handleClear,
        handleDelete,
        handleEdit,
        handleSubmit,
        setTodos,
        handleSortTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
