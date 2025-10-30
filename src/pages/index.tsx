import Head from "next/head";
import { ActionBar } from "@/components/ActionBar";
import { useTodo } from "@/contexts/TodoContext/TodoContext";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";

export default function Home() {
  const { loaded } = useTodo();

  return (
    <>
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen scroll-smooth bg-black/90 p-3 font-sans text-white selection:bg-white/20 md:p-6">
        {/* Main Content */}
        <div className="flex justify-center">
          <div className="flex flex-col gap-9">
            <AddTodo />

            {loaded && <TodoList />}
          </div>
        </div>

        <ActionBar loaded={loaded} />
      </main>
    </>
  );
}
