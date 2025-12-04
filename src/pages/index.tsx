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

      <main className="bg-background min-h-screen scroll-smooth p-3 font-sans md:p-6">
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
