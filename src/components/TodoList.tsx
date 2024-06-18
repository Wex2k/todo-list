import React, { useContext } from "react";
import Todo from "./Todo";
import { TodoContext } from "@/contexts/todoContext";

function TodoList() {
  const { todos } = useContext(TodoContext) as TodoContext;
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
