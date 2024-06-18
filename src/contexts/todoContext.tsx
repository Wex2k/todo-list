import { createContext, FormEvent, useEffect, useState } from "react";

export const TodoContext = createContext<TodoContext | undefined>(undefined);

const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [input, setInput] = useState("");

  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== "undefined") {
      const savedTodos: Todo[] = JSON.parse(localStorage.getItem("todos")!);
      if (savedTodos === null) return [];
      return savedTodos;
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id: number, content: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, content: content, editing: !todo.editing }
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
        },
      ]);
      setInput("");
    }
  };

  const handleClear = () => {
    if (todos.length === 0) return;
    setTodos([]);
    scrollTo(0, 0);
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
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
