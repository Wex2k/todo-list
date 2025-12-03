import type { Priority, ITodo } from "@/components/types/todo";
import type { ITodoContext } from "./todo-context";
import {
  createContext,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Priorities, priorityOrder } from "@/utils/constants";

const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [input, setInput] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [todos, setTodos] = useState<ITodo[]>(() => {
    if (typeof window === "undefined") return [];

    const savedTodos: ITodo[] = JSON.parse(
      localStorage.getItem("todos")!,
    ) as ITodo[];
    return savedTodos ?? [];
  });

  useEffect(() => {
    setLoaded(true);
  }, []);

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
    if (input.trim() !== "") {
      setTodos([
        ...todos,
        {
          content: input,
          editing: false,
          id: Date.now(),
          priority: Priorities.LOW,
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
        loaded,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
