import React from "react";
import Todo from "./Todo";
import useTodo from "@/hooks/useTodo";

function TodoList() {
  const { todos } = useTodo();
  return (
    <div className="flex flex-col gap-5">
      {todos.length > 0 &&
        todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            content={todo.content}
            editing={todo.editing}
          />
        ))}
    </div>
  );
}
export default TodoList;
