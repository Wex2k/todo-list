import type { ITodo, Priority } from "@/components/types/todo";
import type { ITodoContext } from "@/contexts/TodoContext/todo-context";
import { priorityOrder, TaskPriority } from "@/utils/constants";
import {
  createContext,
  FormEvent,
  useContext,
  useSyncExternalStore,
  useState,
} from "react";

type TodoListener = () => void;
const todoListeners = new Set<TodoListener>();
let cachedTodos: ITodo[] | undefined;

const todoStore = {
  subscribe: (callback: TodoListener) => {
    todoListeners.add(callback);
    return () => {
      todoListeners.delete(callback);
    };
  },
  getSnapshot: (): ITodo[] => {
    if (cachedTodos === undefined) {
      const saved = localStorage.getItem("todos");
      if (saved) {
        try {
          cachedTodos = JSON.parse(saved) as ITodo[];
        } catch (error) {
          console.error("Failed to parse todos from local storage", error);
          cachedTodos = [];
        }
      } else {
        cachedTodos = [];
      }
    }
    return cachedTodos;
  },
  getServerSnapshot: (): ITodo[] => [],
  update: (todos: ITodo[]) => {
    cachedTodos = todos;
    localStorage.setItem("todos", JSON.stringify(todos));
    todoListeners.forEach((l) => l());
  },
};

const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [input, setInput] = useState("");
  const todos = useSyncExternalStore(
    todoStore.subscribe,
    todoStore.getSnapshot,
    todoStore.getServerSnapshot,
  );
  const loaded = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const handleDelete = (id: number) => {
    todoStore.update(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id: number, content: string, priority?: Priority) => {
    // If the content is empty when edited, delete the todo
    if (!content || content.trim() === "") {
      handleDelete(id);
      return;
    }

    todoStore.update(
      todos.map((todo) =>
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
      todoStore.update([
        ...todos,
        {
          content: input,
          editing: false,
          id: Date.now(),
          priority: TaskPriority.LOW,
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
      todoStore.update([]);
      scrollTo(0, 0);
    }
  };

  const handleSortTodos = () => {
    todoStore.update(
      todos.toSorted((a, b) => {
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
        setTodos: todoStore.update,
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
