import Head from "next/head";
import { ActionBar } from "@/components/ActionBar";
import { useContext } from "react";
import { TodoContext } from "@/contexts/TodoContext/TodoContext";
import AddTodo from "@/components/AddTodo";

export default function Home() {
  const { loaded } = useContext(TodoContext)!;

  return (
    <>
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen scroll-smooth bg-black/90 p-3 font-sans text-white selection:bg-white/20 md:p-6">
        {/* Main Content */}
        <div className="flex justify-center">
          <AddTodo />
        </div>

        <ActionBar loaded={loaded} />
      </main>
    </>
  );
}
