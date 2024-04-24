import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import { Alert } from "@/components/Alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    setTodos([]);
    scrollTo(0, 0);
  };

  return (
    <>
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col scroll-smooth bg-black/90 p-2 font-sans text-white md:p-6">
        <div className="flex flex-col justify-center gap-9">
          <div className="flex justify-center">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex w-full max-w-sm space-x-3"
            >
              <Input
                type="text"
                placeholder="Add todo..."
                className="w-full rounded-lg border-2 border-white/50 bg-white/20 p-2 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-0"
                onChange={(e) => setValue(e.currentTarget.value)}
                value={value}
              />
              <Button variant={"secondary"} className="uppercase">
                Add todo
              </Button>
            </form>
          </div>
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
                  <Alert
                    message="This action cannot be undone. This will clear all of your todos."
                    triggerMessage="Clear All"
                    handleClear={handleClear}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
