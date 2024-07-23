import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import { ClearTodosAlert } from "@/components/ClearTodosAlert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TodoContext } from "@/contexts/todoContext";

export default function Home() {
  const [loaded, setloaded] = useState(false);
  const { input, setInput, todos, handleSubmit, handleClear } = useContext(
    TodoContext,
  ) as TodoContext;

  useEffect(() => {
    setloaded(true);
  }, []);

  return (
    <>
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col scroll-smooth bg-black/90 p-2 font-sans text-white selection:bg-white/20 md:p-6">
        <div className="flex flex-col justify-center gap-9">
          <div className="flex justify-center">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex w-full max-w-sm space-x-3"
            >
              <Input
                type="text"
                placeholder="Add todo..."
                className="w-full rounded-md border-2 border-white/50 bg-white/20 p-2 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-0"
                onChange={(e) => setInput(e.currentTarget.value)}
                value={input}
              />
              <Button variant="secondary" className="rounded-md uppercase">
                Add todo
              </Button>
            </form>
          </div>
          {loaded && (
            <>
              <div className="flex justify-center">
                <TodoList />

                {todos.length === 0 && (
                  <p className="text-2xl">No todos. Take a rest!</p>
                )}
              </div>

              <div className="flex justify-center">
                {todos.length > 0 && (
                  <ClearTodosAlert
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
