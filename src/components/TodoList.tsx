import React, { useContext } from "react";
import { TodoContext } from "@/contexts/TodoContext/TodoContext";
import { NotebookPen } from "lucide-react";
import Todo from "@/components/Todo";

function TodoList() {
  const { todos } = useContext(TodoContext)!;

  return (
    <div className="mb-20 flex flex-col gap-5 sm:mb-0">
      {!!todos &&
        todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            content={todo.content}
            editing={todo.editing}
            priority={todo.priority}
          />
        ))}

      {!todos?.length && (
        <div className="flex flex-col gap-5">
          <NotebookPen className="size-52 self-center text-white sm:size-60" />
          <h1 className="text-2xl underline decoration-white/60 underline-offset-4">
            No todos yet. Start by adding some!
          </h1>
        </div>
      )}
    </div>
  );
}
export default TodoList;
