import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import TodoList from "~/components/TodoList";
import { IoMdAdd } from "react-icons/io";

export default function Home() {
  const [value, setValue] = useState("");
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    setloaded(true);
  }, []);

  const [todos, setTodos] = useState<Todo[]>(() => {
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

  const handleClear = () => {
    if (todos.length === 0) return;
    if (confirm("Are you sure you want to clear all todos?")) {
      setTodos([]);
    }
    return;
  };

  return (
    <>
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col scroll-smooth bg-gradient-to-b from-[#444346] to-[#212233] p-2 font-sans text-white md:p-6">
        <div className="flex flex-col justify-center gap-9">
          <form
            className="flex justify-center gap-3"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="text"
              autoComplete="off"
              name="content"
              placeholder="Add a todo..."
              className="h-auto w-80 rounded-md border-2 border-slate-500 bg-slate-400/5 indent-2 text-white outline-none drop-shadow-2xl transition duration-300 placeholder:text-white/60 hover:border-slate-600"
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
            />
            <button
              className="rounded-full bg-slate-500 p-3 uppercase text-white drop-shadow-lg transition duration-300 hover:bg-slate-600 md:p-4"
              onClick={() => handleSubmit}
            >
              <IoMdAdd className="text-3xl" />
            </button>
          </form>
          {loaded && (
            <>
              <div className="flex justify-center">
                <TodoList
                  todos={todos}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />

                {todos.length === 0 && (
                  <p className="text-2xl">No todos. Take a rest!</p>
                )}
              </div>

              <div className="flex justify-center">
                {todos.length > 0 && (
                  <button
                    className="rounded-md bg-slate-500 p-3 uppercase text-white drop-shadow-lg transition duration-300 hover:bg-slate-600 md:p-4"
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
