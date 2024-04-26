import { FormEvent, useEffect, useState } from "react";

const useTodo = () => {
  const [inputValueAdd, setInputValueAdd] = useState("");
  const [inputValueEdit, setInputValueEdit] = useState("");

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
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos([...filteredTodos]);
  };

  const handleEdit = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, content: inputValueEdit, editing: !todo.editing };
      }
      return todo;
    });

    setTodos(newTodos);
    setInputValueAdd("");
    setInputValueEdit("");
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
    inputValueEdit,
    setInputValueEdit,
    todos,
    setTodos,
    handleDelete,
    handleEdit,
    handleSubmit,
    handleClear,
  };
};

export default useTodo;
