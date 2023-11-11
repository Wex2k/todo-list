import Head from "next/head";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import TodoList from "~/components/TodoList";

export interface ITodo {
  content: string;
  id: number;
  complete: boolean;
}

export type TodoListType = {
  todos: ITodo[];
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
};

export default function Home() {
  const [value, setValue] = useState("");
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    setloaded(true);
  }, []);

  const [todos, setTodos] = useState<ITodo[]>(() => {
    if (typeof window !== "undefined") {
      const savedTodos = JSON.parse(localStorage.getItem("todos")!);
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
    if (value !== "") {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, content: value };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setValue("");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value !== "") {
      setTodos([
        ...todos,
        {
          content: value,
          id: Date.now(),
          complete: false,
        },
      ]);
      setValue("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.currentTarget.value);
  };

  return (
    <>
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen w-full grid-cols-2 scroll-smooth bg-gradient-to-b from-[#444346] to-[#212233] font-sans">
        <Link href={"/"}>
          <h1 className="mb-7 flex cursor-pointer justify-center text-5xl font-extrabold uppercase tracking-tight text-white sm:text-[5rem]">
            My Todos
          </h1>
        </Link>
        <form
          className="mb-10 flex justify-center gap-3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            autoComplete="off"
            name="content"
            placeholder="Enter todo text"
            className="h-auto w-80 rounded-md border-2 border-slate-500 bg-slate-400/5 text-white outline-none drop-shadow-2xl transition duration-300 placeholder:text-white/60 hover:border-slate-600"
            value={value}
            onChange={(e) => handleChange(e)}
          />
          <button
            className="rounded-md bg-slate-500 p-3 uppercase text-white drop-shadow-lg transition duration-300 hover:bg-slate-600"
            onClick={() => handleSubmit}
          >
            Add todo
          </button>
        </form>
        <div className="flex justify-center">
          {loaded && (
            <TodoList
              todos={todos}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          )}
        </div>
      </main>
    </>
  );
}
