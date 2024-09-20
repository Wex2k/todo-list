import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import TodoList from "@/components/todo-list";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TodoContext } from "@/contexts/TodoContext/todoContext";
import { ActionBar } from "@/components/action-bar";
import { ITodoContext } from "@/contexts/TodoContext/todo-context";

export default function Home() {
  const [loaded, setloaded] = useState(false);
  const { input, setInput, handleSubmit } = useContext(
    TodoContext,
  ) as ITodoContext;

  useEffect(() => {
    setloaded(true);
  }, []);

  return (
    <>
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen scroll-smooth bg-black/90 p-3 font-sans text-white selection:bg-white/20 md:p-6">
        <div className="flex justify-center">
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-2">
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex w-full max-w-sm space-x-3"
              >
                <Input
                  id="add-todo"
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
              <div className="flex justify-center">
                <TodoList />
              </div>
            )}
          </div>
        </div>
        <ActionBar loaded={loaded} />
      </main>
    </>
  );
}
