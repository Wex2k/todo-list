import { FormEvent, useEffect, useState } from "react";

const useTodo = () => {
  const [inputValueAdd, setInputValueAdd] = useState("");

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
    setInputValueAdd("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValueAdd !== "") {
      setTodos([
        ...todos,
        {
          content: inputValueAdd,
          editing: false,
          id: Date.now(),
        },
      ]);
      setInputValueAdd("");
    }
  };

  const handleClear = () => {
    if (todos.length === 0) return;
    setTodos([]);
    scrollTo(0, 0);
  };

  return {
    inputValueAdd,
    setInputValueAdd,
    todos,
    setTodos,
    handleDelete,
    handleEdit,
    handleSubmit,
    handleClear,
  };
};

export default useTodo;
